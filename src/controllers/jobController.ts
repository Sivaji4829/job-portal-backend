import { Request, Response } from 'express';
import Job, { IJob } from '../models/Job';

// @desc    Get all jobs
// @route   GET /api/jobs
export const getJobs = async (req: Request, res: Response): Promise<void> => {
    try {
        const jobs: IJob[] = await Job.find({}).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
export const getJobById = async (req: Request, res: Response): Promise<void> => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a job
// @route   POST /api/jobs
export const createJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, company, location, salary, jobType, description } = req.body;
        const job = new Job({ title, company, location, salary, jobType, description });
        const createdJob = await job.save();
        res.status(201).json(createdJob);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
export const updateJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            job.title = req.body.title || job.title;
            job.company = req.body.company || job.company;
            job.location = req.body.location || job.location;
            job.salary = req.body.salary || job.salary;
            job.jobType = req.body.jobType || job.jobType;
            job.description = req.body.description || job.description;

            const updatedJob = await job.save();
            res.json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
export const deleteJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            await job.deleteOne();
            res.json({ message: 'Job removed' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};