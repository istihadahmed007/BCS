import crypto from 'crypto';
import { AuthUser, SessionTokenPayload, UserRole } from '@/types';
import { SubscriptionService } from './subscription';

// Server-side secret key for signing session tokens
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  'bcs_crack_prod_session_secret_change_in_production_2026';

const COOKIE_NAME = 'bcs_session';

// Global singleton user and session store for development, standalone, and tests
const globalAuth = globalThis as unknown as {
  __bcs_users__?: Map<string, AuthUser>;
  __bcs_sessions__?: Map<string, SessionTokenPayload>;
};

if (!globalAuth.__bcs_users__) {
  globalAuth.__bcs_users__ = new Map();
  // Seed initial Admin & Test Student accounts
  const superAdmin: AuthUser = {
    id: 'user_admin_001',
    email: 'admin@bcs.vartualtutor.com',
    fullName: 'BCSCrack Super Admin',
    role: 'super_admin',
    authProvider: 'credentials',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const studentCurrent: AuthUser = {
    id: 'student_current',
    email: 'student@bcs.vartualtutor.com',
    fullName: 'BCS Aspirant Student',
    role: 'student',
    authProvider: 'credentials',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  globalAuth.__bcs_users__.set(superAdmin.id, superAdmin);
  globalAuth.__bcs_users__.set(studentCurrent.id, studentCurrent);
}

if (!globalAuth.__bcs_sessions__) {
  globalAuth.__bcs_sessions__ = new Map();
}

export class AuthService {
  /**
   * Generates official Google OAuth2 authorization URL
   */
  static getGoogleAuthUrl(redirectOrigin?: string, stateToken?: string): string {
    const clientId = process.env.GOOGLE_CLIENT_ID || 'dummy-google-client-id.apps.googleusercontent.com';
    const baseUrl = redirectOrigin || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    const state = stateToken || crypto.randomBytes(16).toString('hex');
    const scope = encodeURIComponent('openid email profile');

    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${scope}&state=${encodeURIComponent(
      state
    )}&access_type=offline&prompt=select_account`;
  }

  /**
   * Exchanges authorization code for Google token and user identity
   */
  static async verifyGoogleAuthorizationCode(
    code: string,
    redirectOrigin?: string
  ): Promise<{ email: string; name: string; avatarUrl?: string; googleId: string }> {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const baseUrl = redirectOrigin || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    if (!clientId || !clientSecret) {
      // Only allowed in automated test suite
      if (process.env.NODE_ENV === 'test' && (code.startsWith('mock_code_') || !clientId)) {
        return {
          email: 'google_user@test.com',
          name: 'Test Google Candidate',
          avatarUrl: 'https://lh3.googleusercontent.com/a/default-user',
          googleId: 'mock_google_id_12345',
        };
      }
      throw new Error('Google OAuth credentials (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET) not configured in .env.local.');
    }

    // Exchange code with Google OAuth endpoint
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      throw new Error(`Google token exchange failed: ${errText}`);
    }

    const tokenData = await tokenResponse.json();
    const idToken = tokenData.id_token;

    // Verify token info via Google API
    return await this.verifyGoogleIdToken(idToken);
  }

  /**
   * Verifies Google Identity Services ID token (from Google One-Tap or button)
   */
  static async verifyGoogleIdToken(
    idToken: string
  ): Promise<{ email: string; name: string; avatarUrl?: string; googleId: string }> {
    // Development/Test mock token bypass strictly for automated test runner
    if (process.env.NODE_ENV === 'test' && idToken.startsWith('mock_id_token_')) {
      const parts = idToken.split('_');
      const email = parts[3] ? `${parts[3]}@gmail.com` : 'candidate@gmail.com';
      return {
        email,
        name: 'Verified Google Candidate',
        avatarUrl: 'https://lh3.googleusercontent.com/a/default-user',
        googleId: 'mock_gid_' + crypto.createHash('md5').update(email).digest('hex').substring(0, 10),
      };
    }

    try {
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
      if (!response.ok) {
        throw new Error('Google ID token verification failed with status ' + response.status);
      }
      const data = await response.json();

      const expectedClientId = process.env.GOOGLE_CLIENT_ID;
      if (expectedClientId && data.aud !== expectedClientId) {
        throw new Error('Google token audience (aud) mismatch.');
      }

      if (!data.email || !data.email_verified) {
        throw new Error('Google account email is missing or unverified.');
      }

      return {
        email: data.email.toLowerCase(),
        name: data.name || data.email.split('@')[0],
        avatarUrl: data.picture,
        googleId: data.sub,
      };
    } catch (err: any) {
      throw new Error('Google authentication verification failed: ' + err.message);
    }
  }

  /**
   * Finds or creates a user account from Google authentication
   * Automatically provisions Free Preview package for newly registered users.
   */
  static findOrCreateGoogleUser(profile: {
    email: string;
    name: string;
    avatarUrl?: string;
    googleId: string;
  }): { user: AuthUser; isNewUser: boolean } {
    const users = globalAuth.__bcs_users__!;
    const normalizedEmail = profile.email.toLowerCase();

    // Check if user exists by email
    for (const u of users.values()) {
      if (u.email.toLowerCase() === normalizedEmail) {
        // Link googleId if not yet linked
        let updated = false;
        if (!u.googleId) {
          u.googleId = profile.googleId;
          updated = true;
        }
        if (profile.avatarUrl && !u.avatarUrl) {
          u.avatarUrl = profile.avatarUrl;
          updated = true;
        }
        if (updated) {
          u.updatedAt = new Date().toISOString();
        }
        return { user: u, isNewUser: false };
      }
    }

    // Create brand new user
    const newUser: AuthUser = {
      id: 'usr_' + crypto.randomBytes(8).toString('hex'),
      email: normalizedEmail,
      fullName: profile.name,
      avatarUrl: profile.avatarUrl,
      role: 'student',
      authProvider: 'google',
      googleId: profile.googleId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.set(newUser.id, newUser);

    // Auto-grant Free Preview package to newly registered user
    SubscriptionService.grantFreePreview(newUser.id);

    return { user: newUser, isNewUser: true };
  }

  /**
   * Creates a signed session token for authenticated user
   */
  static createSession(user: AuthUser, durationDays = 7): string {
    const sessionId = 'sess_' + crypto.randomBytes(16).toString('hex');
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + durationDays * 24 * 60 * 60;

    const payload: SessionTokenPayload = {
      sessionId,
      userId: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      issuedAt: now,
      expiresAt,
    };

    globalAuth.__bcs_sessions__!.set(sessionId, payload);

    // Encode payload as Base64URL
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    // Generate HMAC signature
    const signature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(encodedPayload)
      .digest('base64url');

    return `${encodedPayload}.${signature}`;
  }

  /**
   * Verifies session token and returns active session payload
   */
  static verifySessionToken(tokenString: string | null | undefined): SessionTokenPayload | null {
    if (!tokenString) return null;

    try {
      const parts = tokenString.split('.');
      if (parts.length !== 2) return null;

      const [encodedPayload, signature] = parts;
      const expectedSignature = crypto
        .createHmac('sha256', SESSION_SECRET)
        .update(encodedPayload)
        .digest('base64url');

      if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
        return null;
      }

      const payload: SessionTokenPayload = JSON.parse(
        Buffer.from(encodedPayload, 'base64url').toString('utf-8')
      );

      const now = Math.floor(Date.now() / 1000);
      if (payload.expiresAt < now) {
        globalAuth.__bcs_sessions__?.delete(payload.sessionId);
        return null;
      }

      return payload;
    } catch {
      return null;
    }
  }

  /**
   * Revokes a session (Logout)
   */
  static revokeSession(sessionId: string): void {
    globalAuth.__bcs_sessions__?.delete(sessionId);
  }

  /**
   * Gets user by ID
   */
  static getUserById(userId: string): AuthUser | null {
    return globalAuth.__bcs_users__?.get(userId) || null;
  }

  /**
   * Gets user by email
   */
  static getUserByEmail(email: string): AuthUser | null {
    const normalized = email.toLowerCase();
    for (const u of globalAuth.__bcs_users__?.values() || []) {
      if (u.email.toLowerCase() === normalized) return u;
    }
    return null;
  }

  /**
   * List all users (Admin operation)
   */
  static listUsers(): AuthUser[] {
    return Array.from(globalAuth.__bcs_users__?.values() || []);
  }

  /**
   * Updates user role (Admin operation)
   */
  static updateUserRole(userId: string, newRole: UserRole, adminId: string): AuthUser {
    const user = this.getUserById(userId);
    if (!user) throw new Error('User not found: ' + userId);
    user.role = newRole;
    user.updatedAt = new Date().toISOString();
    return user;
  }
}
