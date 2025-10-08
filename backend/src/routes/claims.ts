import { Router } from 'express';

import { createClaimDraft, ingestSourceData, listTemplates } from '../controllers/claims.controller';

const claimsRouter = Router();

claimsRouter.get('/templates', listTemplates);
claimsRouter.post('/ingest', ingestSourceData);
claimsRouter.post('/draft', createClaimDraft);

export { claimsRouter };
