const fs = require('fs');
const faker = require('faker');


const images = JSON.parse(fs.readFileSync('database/mysql/images.json') + '');
console.log('images:', images[faker.random.number({ min: 0, max: 999 })]);
const createReview = (cb) => {
	const review = {};
	review.name = faker.name.firstName();
	review.avatar = `https://sdc-reviews-avatars.s3.us-east-2.amazonaws.com/${images[faker.random.number({ min: 0, max: 404 })]}`;
	review.date = faker.date.past(10);
	review.entry_id = faker.random.number({ min: 1, max: 1000000 });
	review.content = faker.lorem.sentences(faker.random.number({ min: 1, max: 10 }));
	cb(review);
};

const saveReviews = (start, end) => {
	for (var i = start; i < end; i++) {
		createReview((review) => {
			if (fs.existsSync('data.json')) {
				fs.appendFileSync('data.json', ',' + JSON.stringify(review));
			} else {
				fs.writeFileSync('data.json', '[' + JSON.stringify(review));
			};
			if (i === end - 1) {
				fs.appendFileSync('data.json', ']');
			}
		});
	}
};

saveReviews(0, 1000000);