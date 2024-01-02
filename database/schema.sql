CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS bins CASCADE;
CREATE TABLE bins (
  id serial PRIMARY KEY,
  unique_string varchar(10) NOT NULL DEFAULT substring(uuid_generate_v4()::text, 1, 6),
  created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  source varChar(255) NOT NULL DEFAULT 'default source name'
);

DROP TABLE IF EXISTS requests CASCADE;
CREATE TABLE requests (
  id serial PRIMARY KEY,
  http_method varchar(10),
  created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  bin_id int NOT NULL REFERENCES bins(id) ON DELETE CASCADE
);