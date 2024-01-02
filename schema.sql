/*
Create a database if not yet existed
*/
DROP DATABASE IF EXISTS request_bin;
CREATE DATABASE request_bin;

/* Go to created database using \c request_bin */

/* 
Create entity BINS: 
  id is primary key,
  unique_string is a 6 character string, unique to the bin, used to generate URL for webhook
  source is the website generating the webhook
  created_at is the timestamp at which the bin was created
*/
DROP TABLE IF EXISTS bins;

CREATE TABLE bins (
  id serial PRIMARY KEY, 
  unique_string varChar(6) UNIQUE,
  source varChar(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

/*
Create custom type METHODS: 
  list of all HTTP METHOD verbs

Create table request:
  id is primary key, 
  bin_id is a FOREIGN KEY to bins
  mongo_id is an integer
  http_method is the method verb to be extracted from request body
  http_path is the path of the website sending the webhook
*/

DROP TABLE IF EXISTS requests;
DROP TYPE IF EXISTS methods;

CREATE TYPE methods AS ENUM ('GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT','OPTIONS', 'TRACE', 'PATCH');
CREATE TABLE requests (
  id serial PRIMARY KEY, 
  bin_id integer REFERENCES bins (id),
  mongo_id integer,
  time time,
  http_method methods,
  http_path varChar(2083)
);
