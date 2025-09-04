CREATE TABLE checklists (
                            id BIGSERIAL PRIMARY KEY,
                            title VARCHAR(120) NOT NULL,
                            description VARCHAR(500),
                            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE items (
                       id BIGSERIAL PRIMARY KEY,
                       checklist_id BIGINT NOT NULL REFERENCES checklists(id) ON DELETE CASCADE,
                       text VARCHAR(240) NOT NULL,
                       done BOOLEAN NOT NULL DEFAULT FALSE,
                       last_edited_by VARCHAR(60),
                       updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_item_checklist ON items(checklist_id);
CREATE INDEX idx_item_checklist_done ON items(checklist_id, done);
