SET search_path TO public;

CREATE TABLE IF NOT EXISTS checklists (
                                          id           SERIAL PRIMARY KEY,
                                          title        TEXT        NOT NULL,
                                          description  TEXT,
                                          created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
    );

CREATE TABLE IF NOT EXISTS items (
                                     id              SERIAL PRIMARY KEY,
                                     checklist_id    INTEGER     NOT NULL REFERENCES checklists(id) ON DELETE CASCADE,
    text            TEXT        NOT NULL,
    done            BOOLEAN     NOT NULL DEFAULT false,
    last_edited_by  TEXT,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
    );

CREATE INDEX IF NOT EXISTS idx_items_checklist ON items(checklist_id);
