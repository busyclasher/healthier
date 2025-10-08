-- Core operational datastore schema (PostgreSQL)

CREATE TABLE IF NOT EXISTS encounter_sources (
    encounter_id TEXT PRIMARY KEY,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS claim_drafts (
    encounter_id TEXT PRIMARY KEY REFERENCES encounter_sources (encounter_id) ON DELETE CASCADE,
    provider_id TEXT NOT NULL,
    patient_id TEXT NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS claim_templates (
    id TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    evidence TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Example seed data
INSERT INTO claim_templates (id, description, evidence)
VALUES
    ('diabetes-vbc', 'Chronic care bundle with HbA1c outcome bonus', ARRAY['lab:hba1c', 'adherence:medication']),
    ('hypertension-vbc', 'Blood pressure management with shared savings trigger', ARRAY['wearable:blood-pressure', 'note:lifestyle-coaching'])
ON CONFLICT (id) DO NOTHING;
