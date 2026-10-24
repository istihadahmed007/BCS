import fs from 'fs';
import path from 'path';
import { AuthUser, SessionTokenPayload } from '@/types';

export interface SupersededSessionInfo {
  userId: string;
  email: string;
  supersededAt: number;
  reason: 'signed_in_on_another_device' | 'admin_revocation';
}

export interface SerializedAuthState {
  users: Record<string, AuthUser>;
  sessions: Record<string, SessionTokenPayload>;
  userActiveSession: Record<string, string>; // userId -> active sessionId
  supersededSessions: Record<string, SupersededSessionInfo>; // sessionId -> metadata
  updatedAt: string;
}

export function isTestEnvironment(): boolean {
  return (
    process.env.NODE_ENV === 'test' ||
    Boolean(process.env.NODE_TEST_CONTEXT) ||
    Boolean(process.env.NODE_TEST_WORKER_ID) ||
    Boolean(process.env.npm_lifecycle_event?.includes('test')) ||
    process.argv.includes('--test') ||
    process.execArgv.some((arg) => arg.startsWith('--test')) ||
    Boolean(process.env.JEST_WORKER_ID) ||
    Boolean(process.env.VITEST)
  );
}

export class AuthStore {
  private users: Map<string, AuthUser> = new Map();
  private sessions: Map<string, SessionTokenPayload> = new Map();
  private userActiveSession: Map<string, string> = new Map();
  private supersededSessions: Map<string, SupersededSessionInfo> = new Map();

  private storageFilePath: string | null = null;
  private isTestMode: boolean = false;
  private lastMtime: number = 0;

  constructor(customStorePath?: string | null, forceTestMode?: boolean) {
    this.isTestMode = forceTestMode ?? isTestEnvironment();

    if (customStorePath) {
      this.storageFilePath = customStorePath;
      this.loadFromDisk();
    } else if (!this.isTestMode) {
      const dataDir = path.resolve(process.cwd(), 'data');
      this.storageFilePath = path.join(dataDir, 'auth_sessions_store.json');
      this.loadFromDisk();
    }
  }

  /**
   * Reloads persisted state from disk if file modified time is newer than cached state.
   */
  private reloadIfChanged(): void {
    if (!this.storageFilePath) return;
    try {
      if (fs.existsSync(this.storageFilePath)) {
        const stats = fs.statSync(this.storageFilePath);
        if (stats.mtimeMs > this.lastMtime) {
          this.loadFromDisk();
        }
      }
    } catch {
      // File read/stat transient ignore
    }
  }

  /**
   * Loads persisted auth and session state from shared disk store.
   */
  private loadFromDisk(): void {
    if (!this.storageFilePath) return;

    try {
      if (fs.existsSync(this.storageFilePath)) {
        const stats = fs.statSync(this.storageFilePath);
        const content = fs.readFileSync(this.storageFilePath, 'utf-8');
        const parsed: SerializedAuthState = JSON.parse(content);

        this.users.clear();
        for (const [id, user] of Object.entries(parsed.users || {})) {
          this.users.set(id, user);
        }

        this.sessions.clear();
        for (const [sid, session] of Object.entries(parsed.sessions || {})) {
          this.sessions.set(sid, session);
        }

        this.userActiveSession.clear();
        for (const [uid, sid] of Object.entries(parsed.userActiveSession || {})) {
          this.userActiveSession.set(uid, sid);
        }

        this.supersededSessions.clear();
        for (const [sid, info] of Object.entries(parsed.supersededSessions || {})) {
          this.supersededSessions.set(sid, info);
        }

        this.lastMtime = stats.mtimeMs;
      }
    } catch (err: any) {
      // If file is corrupt or unreadable, preserve memory and log error
      console.error('[AuthStore] Failed to load session store from disk:', err.message);
    }
  }

  /**
   * Persists state to shared storage file using atomic write (tmp + rename).
   */
  private saveToDisk(): void {
    if (!this.storageFilePath) return;

    try {
      const dir = path.dirname(this.storageFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const state: SerializedAuthState = {
        users: Object.fromEntries(this.users.entries()),
        sessions: Object.fromEntries(this.sessions.entries()),
        userActiveSession: Object.fromEntries(this.userActiveSession.entries()),
        supersededSessions: Object.fromEntries(this.supersededSessions.entries()),
        updatedAt: new Date().toISOString(),
      };

      const tmpPath = `${this.storageFilePath}.${Date.now()}.${Math.random().toString(36).substring(2)}.tmp`;
      fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2), 'utf-8');

      try {
        fs.renameSync(tmpPath, this.storageFilePath);
      } catch {
        // Windows fallback for EPERM/EBUSY on locked destination
        try {
          fs.copyFileSync(tmpPath, this.storageFilePath);
          fs.unlinkSync(tmpPath);
        } catch {}
      }

      try {
        const stats = fs.statSync(this.storageFilePath);
        this.lastMtime = stats.mtimeMs;
      } catch {}
    } catch (err: any) {
      console.error('[AuthStore] Failed to persist session store to disk:', err.message);
    }
  }

  // ==================================================================
  // User Management
  // ==================================================================

  getUser(userId: string): AuthUser | null {
    this.reloadIfChanged();
    return this.users.get(userId) || null;
  }

  getUserByEmail(email: string): AuthUser | null {
    this.reloadIfChanged();
    const normalized = email.toLowerCase().trim();
    for (const u of this.users.values()) {
      if (u.email.toLowerCase() === normalized) {
        return u;
      }
    }
    return null;
  }

  saveUser(user: AuthUser): void {
    this.reloadIfChanged();
    this.users.set(user.id, user);
    this.saveToDisk();
  }

  listUsers(): AuthUser[] {
    this.reloadIfChanged();
    return Array.from(this.users.values());
  }

  // ==================================================================
  // Session & Single-Device Concurrency Control
  // ==================================================================

  /**
   * Atomically activates a new session for an account and invalidates
   * any existing active session (One active device per account).
   */
  createSessionAtomic(
    user: AuthUser,
    sessionId: string,
    payload: SessionTokenPayload
  ): void {
    this.reloadIfChanged();

    // 1. Identify any currently active session for this user
    const previousSessionId = this.userActiveSession.get(user.id);
    if (previousSessionId && previousSessionId !== sessionId) {
      // Invalidate previous session and record it as superseded
      this.sessions.delete(previousSessionId);
      this.supersededSessions.set(previousSessionId, {
        userId: user.id,
        email: user.email,
        supersededAt: Date.now(),
        reason: 'signed_in_on_another_device',
      });
    }

    // 2. Set new session as the ONLY active session
    this.userActiveSession.set(user.id, sessionId);
    this.sessions.set(sessionId, payload);

    // 3. Atomically persist state
    this.saveToDisk();
  }

  getSession(sessionId: string): SessionTokenPayload | null {
    this.reloadIfChanged();
    return this.sessions.get(sessionId) || null;
  }

  getActiveSessionForUser(userId: string): string | null {
    this.reloadIfChanged();
    return this.userActiveSession.get(userId) || null;
  }

  getSupersededSession(sessionId: string): SupersededSessionInfo | null {
    this.reloadIfChanged();
    return this.supersededSessions.get(sessionId) || null;
  }

  revokeSession(sessionId: string): void {
    this.reloadIfChanged();
    const session = this.sessions.get(sessionId);
    if (session) {
      if (this.userActiveSession.get(session.userId) === sessionId) {
        this.userActiveSession.delete(session.userId);
      }
      this.sessions.delete(sessionId);
    }
    this.saveToDisk();
  }

  clearForTesting(): void {
    this.users.clear();
    this.sessions.clear();
    this.userActiveSession.clear();
    this.supersededSessions.clear();
    this.lastMtime = 0;
    if (this.storageFilePath && fs.existsSync(this.storageFilePath)) {
      try {
        fs.unlinkSync(this.storageFilePath);
      } catch {}
    }
  }
}

// Global singleton instance for application runtime
const globalStoreRef = globalThis as unknown as { __bcs_auth_store__?: AuthStore };
if (!globalStoreRef.__bcs_auth_store__) {
  globalStoreRef.__bcs_auth_store__ = new AuthStore();
}

export const defaultAuthStore = globalStoreRef.__bcs_auth_store__;
