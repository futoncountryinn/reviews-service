USE airbnb \
LOAD DATA LOCAL INFILE 'mysql-data.csv' \
INTO TABLE reviews \
FIELDS TERMINATED BY ',' \
ENCLOSED BY '"' \
LINES TERMINATED BY '\n' \
IGNORE 1 ROWS \
(@noninclude, name,entry_id,avatar,date,content);
  