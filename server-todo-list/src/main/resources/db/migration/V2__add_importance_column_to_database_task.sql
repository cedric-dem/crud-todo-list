DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_importance') THEN
            CREATE TYPE task_importance AS ENUM ('Low', 'Medium', 'High');
        END IF;
    END$$;

ALTER TABLE database_task
    ADD COLUMN importance task_importance NOT NULL DEFAULT 'Low';