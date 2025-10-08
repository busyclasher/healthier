import { Router } from 'express';

import { createClaimDraft, ingestSourceData, listTemplates } from '../controllers/claims.controller';
import { asyncHandler } from '../utils/asyncHandler';

const claimsRouter = Router();

claimsRouter.get('/templates', asyncHandler(listTemplates));
claimsRouter.post('/ingest', asyncHandler(ingestSourceData));
claimsRouter.post('/draft', asyncHandler(createClaimDraft));

export { claimsRouter };
