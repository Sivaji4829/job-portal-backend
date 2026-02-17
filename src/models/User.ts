import mongoose, { Schema, Document } from 'mongoose';

/**
 * User Schema - Strictly for Administrative Credentials
 */
export interface IUser extends Document {
  email: string;
  passwordHash: string; // Stored securely after hashing
  role: 'admin';
  createdAt: Date;
}

const userSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin'], 
    default: 'admin' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', userSchema);