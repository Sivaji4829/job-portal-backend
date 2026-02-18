import mongoose, { Schema, Document } from 'mongoose';

/**
 * IUser Interface
 * Defines the structure of the administrative identity in the cluster.
 */
export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Schema
 * Optimized for administrative access management.
 */
const userSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: [true, 'Corporate email is required'], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email identity']
  },
  passwordHash: { 
    type: String, 
    required: [true, 'Security key hash is required'] 
  },
  role: { 
    type: String, 
    enum: ['admin'], 
    default: 'admin' 
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt for audit trails
});

// Create an index on email for faster lookup during authorization
userSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', userSchema);