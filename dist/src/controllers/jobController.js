"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.createJob = exports.getJobById = exports.getJobs = void 0;
const Job_1 = __importDefault(require("../models/Job"));
// @desc    Get all jobs
// @route   GET /api/jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job_1.default.find({}).sort({ createdAt: -1 });
        res.json(jobs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getJobs = getJobs;
// @desc    Get job by ID
// @route   GET /api/jobs/:id
const getJobById = async (req, res) => {
    try {
        const job = await Job_1.default.findById(req.params.id);
        if (job) {
            res.json(job);
        }
        else {
            res.status(404).json({ message: 'Job not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getJobById = getJobById;
// @desc    Create a job
// @route   POST /api/jobs
const createJob = async (req, res) => {
    try {
        const { title, company, location, salary, jobType, description } = req.body;
        const job = new Job_1.default({ title, company, location, salary, jobType, description });
        const createdJob = await job.save();
        res.status(201).json(createdJob);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createJob = createJob;
// @desc    Update a job
// @route   PUT /api/jobs/:id
const updateJob = async (req, res) => {
    try {
        const job = await Job_1.default.findById(req.params.id);
        if (job) {
            job.title = req.body.title || job.title;
            job.company = req.body.company || job.company;
            job.location = req.body.location || job.location;
            job.salary = req.body.salary || job.salary;
            job.jobType = req.body.jobType || job.jobType;
            job.description = req.body.description || job.description;
            const updatedJob = await job.save();
            res.json(updatedJob);
        }
        else {
            res.status(404).json({ message: 'Job not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateJob = updateJob;
// @desc    Delete a job
// @route   DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
    try {
        const job = await Job_1.default.findById(req.params.id);
        if (job) {
            await job.deleteOne();
            res.json({ message: 'Job removed' });
        }
        else {
            res.status(404).json({ message: 'Job not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteJob = deleteJob;
