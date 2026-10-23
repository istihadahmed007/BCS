import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, clientSecret } = body;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { success: false, error: 'Both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required.' },
        { status: 400 }
      );
    }

    const trimmedClientId = clientId.trim();
    const trimmedClientSecret = clientSecret.trim();

    // Update active process.env
    process.env.GOOGLE_CLIENT_ID = trimmedClientId;
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = trimmedClientId;
    process.env.GOOGLE_CLIENT_SECRET = trimmedClientSecret;

    // Save to .env.local file
    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Replace or append GOOGLE_CLIENT_ID
    if (envContent.includes('GOOGLE_CLIENT_ID=')) {
      envContent = envContent.replace(/GOOGLE_CLIENT_ID=.*/g, `GOOGLE_CLIENT_ID=${trimmedClientId}`);
    } else {
      envContent += `\nGOOGLE_CLIENT_ID=${trimmedClientId}`;
    }

    // Replace or append NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (envContent.includes('NEXT_PUBLIC_GOOGLE_CLIENT_ID=')) {
      envContent = envContent.replace(/NEXT_PUBLIC_GOOGLE_CLIENT_ID=.*/g, `NEXT_PUBLIC_GOOGLE_CLIENT_ID=${trimmedClientId}`);
    } else {
      envContent += `\nNEXT_PUBLIC_GOOGLE_CLIENT_ID=${trimmedClientId}`;
    }

    // Replace or append GOOGLE_CLIENT_SECRET
    if (envContent.includes('GOOGLE_CLIENT_SECRET=')) {
      envContent = envContent.replace(/GOOGLE_CLIENT_SECRET=.*/g, `GOOGLE_CLIENT_SECRET=${trimmedClientSecret}`);
    } else {
      envContent += `\nGOOGLE_CLIENT_SECRET=${trimmedClientSecret}`;
    }

    fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Google OAuth credentials successfully saved to .env.local!',
      clientId: trimmedClientId,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
