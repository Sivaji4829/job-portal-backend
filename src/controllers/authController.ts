import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * @desc    Register a new administrative identity into the MongoDB cluster
 * @route   POST /api/auth/register
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if the identity already exists in the cluster
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'Identity already provisioned in cluster.' });
      return;
    }

    // Securely hash the access key before database insertion
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Provision the new user record
    const user = await User.create({
      email,
      passwordHash: hashedPassword,
      role: 'admin'
    });

    if (user) {
      res.status(201).json({ 
        message: 'Identity provisioned successfully. Master Node Active.',
        _id: user._id,
        email: user.email 
      });
    } else {
      res.status(400).json({ message: 'Invalid identity data provided.' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Cluster Provisioning Error', error: error.message });
  }
};

/**
 * @desc    Authorize administrative session (MongoDB + Master Fallback)
 * @route   POST /api/auth/login
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // --- 1. HARDCODED MASTER BYPASS (Alternative/Emergency Access) ---
    // As requested, we maintain the hardcoded credentials as a failsafe alternative.
    if (email === 'admin@hiresync.com' && password === 'admin123') {
      const token = jwt.sign({ role: 'superadmin' }, process.env.JWT_SECRET || 'hiresync_secret_key', {
        expiresIn: '30d',
      });

      res.status(200).json({
        message: 'Master Bypass Authorized',
        token,
        user: { email: 'admin@hiresync.com', role: 'admin' }
      });
      return;
    }

    // --- 2. STANDARD MONGODB AUTHENTICATION ---
    const user = await User.findOne({ email });
    
    // Verify password against stored hash if user exists
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'hiresync_secret_key', {
        expiresIn: '30d',
      });

      res.status(200).json({
        message: 'Access Granted: Session Authorized',
        token,
        user: { 
          email: user.email, 
          role: user.role 
        }
      });
    } else {
      // Access denied if neither DB match nor Master Bypass match
      res.status(401).json({ message: 'Invalid administrative credentials.' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Gateway Authorization Error', error: error.message });
  }
};