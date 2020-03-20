# node-mentoring

## Setup
- Create user and database
  - `su - postgres`
  - `psql` call PostgreSQL terminal
  - `\password postgres` set password foe Admin
  - `sudo -u postgres psql` call PostgreSQL terminal as admin (if you quit from previous step)
  - `CREATE USER <your_user> WITH PASSWORD '<your_password>';` create new user for working with database
  - `CREATE DATABASE <your_data_base_name> OWNER <your_user>;` create database
  - `\quit`
- or
  - `createdb <your_data_base_name> -U <db_user>`
- Migrations
  - `npm run migrate`
  - `npm run migrate:undo`
- Seeding
  - `npm run seed`
  - `npm run seed:undo`

## Starting App
- `npm start`
- `npm run dev` (development mode)

## Test
- `npm test`
- `npm run test:watch` (watch all mode)

