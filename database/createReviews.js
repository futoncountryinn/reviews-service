//identical to mySQL script with addition of id field to serve as primary key
const fs = require('fs');
const faker = require('faker');


const images = JSON.parse(fs.readFileSync('database/images.json') + '');
const createReview = (cb, end, idRow) => {
  const review = {};
  review.name = faker.name.firstName();
  if (idRow) { review.id = idRow; }
  review.avatar = `https://sdc-reviews-avatars.s3.us-east-2.amazonaws.com/${images[faker.random.number({ min: 0, max: 402 })].id}`;
  review.date = faker.date.past(10);
  review.entry_id = faker.random.number({ min: 1, max: end });
  review.content = faker.lorem.sentences(faker.random.number({ min: 1, max: 10 }));
  cb(review);
};

const saveReviews = (start, end, addId) => {
  // write file
  if (start === 1) {
    if (addId) {
      fs.writeFileSync('data.csv', 'id,name,entry_id,avatar,date,content\n');
      saveReviews(start + 1, end, addId);
    } else {
      fs.writeFileSync('data.csv', 'name,entry_id,avatar,date,content\n');
      saveReviews(start + 1, end, addId);
    }
  }
  // append to file
  if (start < end) {
    if (addId) {
      createReview((review) => {
        fs.appendFileSync('data.csv', `${review.id},${review.name}, ${review.entry_id}, ${review.avatar}, ${review.date}, ${review.content}` + '\n',
        );
      }, end, start);
      saveReviews(start + 1, end, addId)
    } else {
      createReview((review) => {
        fs.appendFileSync('data.csv', `${review.name}, ${review.entry_id}, ${review.avatar}, ${review.date}, ${review.content}` + '\n');
      }, end);
      saveReviews(start + 1, end, addId);
    }
  }
};

saveReviews(1, 5000, true);
console.log(Date.now());
