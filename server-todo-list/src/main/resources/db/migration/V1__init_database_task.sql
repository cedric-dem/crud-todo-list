
CREATE TABLE database_task (
                               id BIGSERIAL PRIMARY KEY,
                               title VARCHAR(255) NOT NULL,
                               content TEXT NOT NULL,
                               completed BOOLEAN NOT NULL DEFAULT FALSE
);
