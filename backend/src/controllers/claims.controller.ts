import { Request, Response } from 'express';
import { z } from 'zod';

import { claimsService } from '../services/claims.service';

const ingestionSchema = z.object({
  encounterId: z.string(),
  transcript: z.string().min(1).optional(),
  wearableSummary: z.record(z.unknown()).optional(),
  labResults: z.array(z.record(z.unknown())).optional()
});

const draftSchema = z.object({
  encounterId: z.string(),
  providerId: z.string(),
  patientId: z.string(),
  outcomeMetrics: z.array(
    z.object({
      code: z.string(),
      value: z.union([z.string(), z.number()]),
      unit: z.string().optional()
    })
  )
});

export const ingestSourceData = async (req: Request, res: Response) => {
  const parsed = ingestionSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.flatten().fieldErrors });
  }

  const result = await claimsService.ingestEncounter(parsed.data);

  res.status(202).json({
    message: 'Encounter data accepted for enrichment',
    encounterId: result.encounterId
  });
};

export const createClaimDraft = async (req: Request, res: Response) => {
  const parsed = draftSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.flatten().fieldErrors });
  }

  const claim = await claimsService.createDraft(parsed.data);

  res.json({ claim, status: 'draft' });
};

export const listTemplates = async (_req: Request, res: Response) => {
  const templates = await claimsService.listTemplates();
  res.json({ templates });
};
