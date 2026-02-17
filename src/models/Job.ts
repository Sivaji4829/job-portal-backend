import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
    title: string;
    company: string;
    location: string;
    salary: string;
    jobType: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const jobSchema: Schema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    jobType: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.model<IJob>('Job', jobSchema);