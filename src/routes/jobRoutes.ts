import express, { Router } from 'express';
import { 
    getJobs, 
    getJobById, 
    createJob, 
    updateJob, 
    deleteJob 
} from '../controllers/jobController';

const router: Router = express.Router();

router.route('/')
    .get(getJobs)
    .post(createJob);

router.route('/:id')
    .get(getJobById)
    .put(updateJob)
    .delete(deleteJob);

export default router;