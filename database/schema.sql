CREATE DATABASE bnb;

USE bnb;

CREATE TABLE reviews (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(25) NOT NULL,
  avatar VARCHAR(25) NOT NULL,
  numDaysAgo INT NOT NULL,
  content VARCHAR(1500)
)

CREATE EVENT updateReviewAge
    ON SCHEDULE AT '2019-05-11 13:02:00' + INTERVAL 24 HOUR
    DO
      UPDATE bnb.reviews SET numDaysAgo = numDaysAgo + 1;