# node-mentoring

- Create user and database
  - `su - postgres`
  - `psql` call PostgreSQL terminal
  - `\password postgres` set password foe Admin
  - `sudo -u postgres psql` call PostgreSQL terminal as admin (if you quit from previous step)
  - `CREATE USER yourUser WITH PASSWORD 'yourPassword';` create new user for working with database
  - `CREATE DATABASE yourDataBaseName OWNER yourUser;` create database
  - `\quit`
