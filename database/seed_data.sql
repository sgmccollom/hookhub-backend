-- INSERT INTO bins DEFAULT VALUES;
-- INSERT INTO bins DEFAULT VALUES;
-- INSERT INTO bins DEFAULT VALUES;
-- INSERT INTO bins DEFAULT VALUES;
-- INSERT INTO bins DEFAULT VALUES;
-- INSERT INTO bins DEFAULT VALUES;
-- INSERT INTO bins DEFAULT VALUES;
-- INSERT INTO bins DEFAULT VALUES;
-- INSERT INTO bins DEFAULT VALUES;
-- INSERT INTO bins DEFAULT VALUES;

-- SELECT * FROM bins;

--  id | unique_string |         created_at         |       source        
-- ----+---------------+----------------------------+---------------------
--   1 | 9d8d3a        | 2023-09-14 15:18:42.384633 | default source name
--   2 | 2c90c6        | 2023-09-14 15:18:44.799051 | default source name
--   3 | ab1701        | 2023-09-14 15:18:46.057063 | default source name
--   4 | 99f2a5        | 2023-09-14 15:18:47.226496 | default source name
--   5 | 19fbb4        | 2023-09-14 15:18:48.364048 | default source name
--   6 | 7c7d32        | 2023-09-14 15:18:49.437761 | default source name
--   7 | 4533b3        | 2023-09-14 15:18:50.508266 | default source name
--   8 | c42f20        | 2023-09-14 15:18:51.558285 | default source name
--   9 | 64b42b        | 2023-09-14 15:18:52.604874 | default source name
--  10 | 366a5f        | 2023-09-14 15:18:53.645268 | default source name
-- (10 rows)

-- INSERT INTO requests (http_method, bin_id)
-- VALUES ('GET', 1),
--        ('POST', 2),
--        ('PUT', 2),
--        ('DELETE', 2),
--        ('GET', 3);

-- SELECT * FROM requests;

--  id | http_method |         created_at         | bin_id 
-- ----+-------------+----------------------------+--------
--   1 | GET         | 2023-09-14 15:21:58.593361 |      1
--   2 | POST        | 2023-09-14 15:21:58.593361 |      2
--   3 | PUT         | 2023-09-14 15:21:58.593361 |      2
--   4 | DELETE      | 2023-09-14 15:21:58.593361 |      2
--   5 | GET         | 2023-09-14 15:21:58.593361 |      3
-- (5 rows)

-- SELECT bins.id AS bin_id, bins.unique_string, requests.id AS request_id, http_method
-- FROM bins JOIN requests ON bins.id = bin_id;

--  bin_id | unique_string | request_id | http_method 
-- --------+---------------+------------+-------------
--       1 | 9d8d3a        |          1 | GET
--       2 | 2c90c6        |          2 | POST
--       2 | 2c90c6        |          3 | PUT
--       2 | 2c90c6        |          4 | DELETE
--       3 | ab1701        |          5 | GET
-- (5 rows)