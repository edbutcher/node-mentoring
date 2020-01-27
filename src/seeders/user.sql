CREATE TABLE IF NOT EXISTS users (
    login VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    age INTEGER NOT NULL,
    deleted BOOLEAN
)

INSERT INTO users (login, password, age, deleted)
VALUES  ('edbutcher', 'pass1234', 50, FALSE);

INSERT INTO users (login, password, age, deleted)
VALUES  ('testUser', 'pass1234', 18, FALSE);

INSERT INTO users (login, password, age, deleted)
VALUES  ('mentorUser', 'pass1234', 100, TRUE);
