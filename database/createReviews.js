//identical to mySQL script with addition of id field to serve as primary key
const fs = require('fs');
const faker = require('faker');
const moment = require('moment');


const images = JSON.parse(fs.readFileSync('database/images.json') + '');
const createReview = (cb, idRow) => {
  const review = {};
  review.name = faker.name.firstName();
  if (idRow) { review.id = idRow; }
  review.avatar = `https://sdc-reviews-avatars.s3.us-east-2.amazonaws.com/${images[faker.random.number({ min: 0, max: 402 })].id}`;
  review.date = moment(faker.date.past(10)).format('YYYY-MM-DD');
  review.entry_id = faker.random.number({ min: 1, max: 10000000 });
  review.content = faker.lorem.sentences(faker.random.number({ min: 1, max: 10 }));
  cb(review);
};

const saveReviews = (start, end, idRow = false) => {
  if (idRow) {
    for (var i = start; i < end; i++) {
      createReview((review) => {
        if (fs.existsSync('mysql-data.csv')) {
          fs.appendFileSync('mysql-data.csv', `${review.id},${review.name},${review.entry_id},${review.avatar},${review.date},${review.content}` + '\n');
        } else {
          fs.writeFileSync('mysql-data.csv', 'id,name,entry_id,avatar,date,content\n' + `${review.id},${review.name},${review.entry_id},${review.avatar},${review.date},${review.content}` + '\n');
        };
      }, i);
    }
  } else {
    for (var i = start; i < end; i++) {
      createReview((review) => {
        if (fs.existsSync('mysql-data.csv')) {
          fs.appendFileSync('mysql-data.csv', `${review.name},${review.entry_id},${review.avatar},${review.date},${review.content}` + '\n');
        } else {
          fs.writeFileSync('mysql-data.csv', 'name,entry_id,avatar,date,content\n' + `${review.name},${review.entry_id},${review.avatar},${review.date},${review.content}` + '\n');
        };
      });
    }
  }
}


saveReviews(1, 50000000, true);