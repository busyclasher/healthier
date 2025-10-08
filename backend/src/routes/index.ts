import { Router } from 'express';

import { claimsRouter } from './claims';
import { healthRouter } from './health';

const router = Router();

router.use('/health', healthRouter);
router.use('/claims', claimsRouter);

export { router };
