-- DROP DATABASE IF EXISTS airbnb;

-- CREATE DATABASE airbnb;

USE airbnb;

CREATE TABLE reviews (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  entry_id INT NOT NULL,
  name VARCHAR(25) NOT NULL,
  avatar VARCHAR(75) NOT NULL,
  date DATE NOT NULL,
  content VARCHAR(1500)
)

-- CREATE EVENT updateReviewAge
--     ON SCHEDULE AT '2019-05-11 13:02:00' + INTERVAL 24 HOUR
--     DO
--       UPDATE airbnb.reviews SET numDaysAgo = numDaysAgo + 1;