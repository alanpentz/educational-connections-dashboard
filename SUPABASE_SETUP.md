# Supabase Authentication Setup Guide

## Step 1: Create Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Name it: `educational-connections`
4. Set a strong database password (save this!)
5. Choose your region (closest to your users)
6. Click "Create Project"

## Step 2: Get Your API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon/Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 3: Update Your Dashboard

1. Open `index-supabase.html`
2. Replace these lines (around line 425-426):
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

With your actual values:
```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## Step 4: Configure Authentication Settings

1. In Supabase, go to **Authentication** → **Settings**
2. Under **Email Auth**, ensure these are set:
   - Enable Email Confirmations: ON (recommended) or OFF (for testing)
   - Enable Email Sign-ups: ON

3. Under **Site URL**, add your Vercel URL:
   - `https://educational-connections-dashboard.vercel.app`

## Step 5: Add Authorized Users

### Option A: Allow Specific Email Domains (Recommended)
1. Go to **Authentication** → **Settings** → **Email Domains**
2. Add allowed domains (e.g., `@educational-connections.com`)

### Option B: Manually Add Users
1. Go to **Authentication** → **Users**
2. Click "Invite User"
3. Add emails:
   - `alan@yourdomain.com`
   - `client@educational-connections.com`

### Option C: Create Users via SQL (Advanced)
1. Go to **SQL Editor**
2. Run:
```sql
-- Create authorized users table
CREATE TABLE authorized_emails (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add authorized emails
INSERT INTO authorized_emails (email) VALUES 
  ('alan@yourdomain.com'),
  ('client@educational-connections.com');

-- Create a policy to only allow authorized emails
CREATE POLICY "Only authorized emails can sign up" 
ON auth.users 
FOR INSERT 
WITH CHECK (
  email IN (SELECT email FROM authorized_emails)
);
```

## Step 6: Set Up Environment Variables in Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase Anon Key

## Step 7: Deploy and Test

1. Rename `index-supabase.html` to `index.html`:
```bash
mv index-supabase.html index.html
```

2. Push to GitHub:
```bash
git add .
git commit -m "Add Supabase authentication"
git push origin main
```

3. Test authentication:
   - Visit your Vercel URL
   - Try signing up with an authorized email
   - Check email for confirmation (if enabled)
   - Sign in and verify dashboard loads

## Security Best Practices

1. **Row Level Security (RLS)**
   - Enable RLS on any tables you create
   - Only authenticated users can view dashboard

2. **Email Verification**
   - Keep email confirmations ON in production
   - Prevents unauthorized access

3. **Password Requirements**
   - Set minimum password length in Supabase Auth settings
   - Recommend: 12+ characters

4. **Session Management**
   - Sessions expire after 1 week by default
   - Can adjust in Authentication → Settings

## Troubleshooting

### "Invalid API Key"
- Double-check you copied the correct Anon/Public key
- Ensure no extra spaces in the key

### "Email not confirmed"
- Check spam folder
- Or disable email confirmation for testing

### "Unauthorized"
- Ensure user email is in authorized list
- Check Supabase logs: **Logs** → **Auth**

## Additional Features You Can Add

1. **Password Reset**
```javascript
const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://your-site.com/reset-password',
});
```

2. **Magic Link Login**
```javascript
const { error } = await supabaseClient.auth.signInWithOtp({
  email: email,
});
```

3. **Google/GitHub OAuth**
- Enable in Authentication → Providers
- Add OAuth credentials

## Support

- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Auth Docs: [supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth)
- Discord: [discord.supabase.com](https://discord.supabase.com)