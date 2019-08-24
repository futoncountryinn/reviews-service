//identical to mySQL script with addition of id field to serve as primary key
const fs = require('fs');
const faker = require('faker');


const images = JSON.parse(fs.readFileSync('database/mysql/images.json') + '');
const createReview = (cb, id) => {
  const review = {};
  review.name = faker.name.firstName();
  review.id = id;
  review.avatar = `https://sdc-reviews-avatars.s3.us-east-2.amazonaws.com/${images[faker.random.number({ min: 0, max: 404 })]}`;
  review.date = faker.date.past(10);
  review.entry_id = faker.random.number({ min: 1, max: 1000000 });
  review.content = faker.lorem.sentences(faker.random.number({ min: 1, max: 10 }));
  cb(review);
};

const saveReviews = (start, end) => {
  for (var i = start; i < end; i++) {
    createReview((review, i) => {
      if (fs.existsSync('data.csv')) {
        fs.appendFileSync('data.csv', `${review.id}, ${review.name}, ${review.entry_id}, ${review.avatar}, ${review.date}, ${review.content}` + '\n');
      } else {
        fs.writeFileSync('data.csv', 'id,name,entry_id,avatar,date,content\n' + `${review.id},${review.name},${review.entry_id},${review.avatar},${review.date},${review.content}`);
      };
    });
  }
};

saveReviews(0, 50000000);