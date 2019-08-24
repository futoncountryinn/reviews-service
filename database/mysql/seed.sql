USE airbnb \
LOAD DATA LOCAL INFILE 'data.csv' \
INTO TABLE reviews \
FIELDS TERMINATED BY ',' \
ENCLOSED BY '"' \
LINES TERMINATED BY '\n' \
IGNORE 1 ROWS \
(name,entry_id,avatar,date,content);
  