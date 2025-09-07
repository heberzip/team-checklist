BEGIN;

-- 1) Sprint demo
WITH c AS (
INSERT INTO checklists (title, description, created_at)
VALUES ('Sprint demo', 'Tareas del sprint de la semana', now())
    RETURNING id
    )
INSERT INTO items (checklist_id, text, done, last_edited_by, updated_at)
SELECT id, t.text, t.done, t.last_by, now()
FROM c CROSS JOIN (VALUES
                       ('Configurar entorno Angular + Tailwind', false, NULL),
                       ('Crear componentes base (Header, List, Item)', false, NULL),
                       ('Conectar API /api/checklists', false, NULL),
                       ('Implementar PATCH de items (done)', false, NULL),
                       ('Escribir README con pasos', false, NULL)
) AS t(text, done, last_by);

-- 2) Onboarding
WITH c AS (
INSERT INTO checklists (title, description, created_at)
VALUES ('Onboarding', 'Checklist para nuevas incorporaciones', now())
    RETURNING id
    )
INSERT INTO items (checklist_id, text, done, last_edited_by, updated_at)
SELECT id, t.text, t.done, t.last_by, now()
FROM c CROSS JOIN (VALUES
                       ('Crear usuario y permisos', false, NULL),
                       ('Entregar credenciales y 2FA', false, NULL),
                       ('Configurar IDE y plugins', false, NULL),
                       ('Presentación a equipo y rituales', false, NULL),
                       ('Primer ticket guiado', false, NULL)
) AS t(text, done, last_by);

-- 3) Groceries
WITH c AS (
INSERT INTO checklists (title, description, created_at)
VALUES ('Groceries', 'Lista de la compra de ejemplo', now())
    RETURNING id
    )
INSERT INTO items (checklist_id, text, done, last_edited_by, updated_at)
SELECT id, t.text, t.done, t.last_by, now()
FROM c CROSS JOIN (VALUES
                       ('Leche entera 2L', false, NULL),
                       ('Huevos L x12', false, NULL),
                       ('Pasta integral 500g', true, 'Ana'),
                       ('Tomates maduros 1kg', false, NULL),
                       ('Café molido 250g', false, NULL)
) AS t(text, done, last_by);

COMMIT;
