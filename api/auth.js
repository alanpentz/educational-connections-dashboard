export default function handler(req, res) {
    const { password } = req.body || req.query;
    
    // Get password from environment variable (set in Vercel dashboard)
    const correctPassword = process.env.DASHBOARD_PASSWORD || 'EC2025Dashboard';
    
    if (password === correctPassword) {
        res.status(200).json({ authenticated: true });
    } else {
        res.status(401).json({ authenticated: false });
    }
}