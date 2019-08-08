USE airbnb \
LOAD DATA LOCAL INFILE 'database/data.csv' \
INTO TABLE reviews \
FIELDS TERMINATED BY ',' \
ENCLOSED BY '"' \
LINES TERMINATED BY '\n' \
(id,name,avatar,numDaysAgo,content);

SET GLOBAL event_scheduler = ON;

-- create event updateage on schedule every 2 minute;


-- LOAD DATA INFILE 'path/to/file.csv'
-- INTO TABLE table_name
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;