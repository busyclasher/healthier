import { Request, Response } from 'express';
import { z } from 'zod';

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

export const ingestSourceData = (req: Request, res: Response) => {
  const parsed = ingestionSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.flatten().fieldErrors });
  }

  // Placeholder only: downstream persistence and pipeline triggers will attach here.
  res.status(202).json({
    message: 'Encounter data accepted for enrichment',
    encounterId: parsed.data.encounterId
  });
};

export const createClaimDraft = (req: Request, res: Response) => {
  const parsed = draftSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.flatten().fieldErrors });
  }

  const { encounterId, providerId, patientId, outcomeMetrics } = parsed.data;

  const mockClaim = {
    encounterId,
    providerId,
    patientId,
    codes: [
      { system: 'ICD-10', code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
      { system: 'CPT', code: '99490', description: 'Chronic care management services' }
    ],
    outcomes: outcomeMetrics,
    attachments: [
      {
        type: 'ZKP',
        description: 'Proof of HbA1c reduction >= 1.0',
        proofId: `proof-${encounterId}`
      }
    ]
  };

  res.json({ claim: mockClaim, status: 'draft' });
};

export const listTemplates = (_req: Request, res: Response) => {
  res.json({
    templates: [
      {
        id: 'diabetes-vbc',
        description: 'Chronic care bundle with HbA1c outcome bonus',
        evidence: ['lab:hba1c', 'adherence:medication', 'note:protocol-compliance']
      },
      {
        id: 'hypertension-vbc',
        description: 'Blood pressure management with shared savings trigger',
        evidence: ['wearable:blood-pressure', 'note:lifestyle-coaching', 'lab:lipid-profile']
      }
    ]
  });
};
