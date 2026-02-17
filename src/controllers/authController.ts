import { Request, Response } from 'express';
import User from '../models/User';

/**
 * @desc    Login Verification with Strict Rule
 * @route   POST /api/auth/login
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Enforce Strict Rule at Controller Level
    if (email !== 'admin@hiresync.com' || password !== 'admin123') {
      res.status(401).json({ message: 'Authentication Denied: Invalid Master Credentials' });
      return;
    }

    // 2. Verify existence in MongoDB
    const user = await User.findOne({ email: 'admin@hiresync.com' });
    
    if (!user) {
      res.status(404).json({ message: 'Admin record not initialized in Cluster' });
      return;
    }

    // In a production app, we would use bcrypt.compare(password, user.passwordHash)
    // and generate a real JWT token here.
    
    res.status(200).json({
      message: 'Access Granted',
      token: 'session_active_secure_partition',
      user: {
        email: user.email,
        role: user.role
      }
    });

  } catch (error: any) {
    res.status(500).json({ message: 'Secure Node Error', error: error.message });
  }
};