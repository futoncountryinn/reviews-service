const fs = require('fs');
const faker = require('faker');

const createReview = (cb) => {
	const review = {};
	review.name = faker.name.firstName();
	review.avatar = `http://robohash.org/${faker.random.number()}`
	review.date = faker.date.past(10);
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

saveReviews(0, 100000);