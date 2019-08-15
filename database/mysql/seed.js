// THESE ARE MY NOTES ON MYSQL
//LOAD DATA LOCAL INFILE 'MOCK_DATA.csv' INTO TABLE bnb.reviews;

// LOAD DATA LOCAL INFILE 'MOCK_DATA.csv'
// INTO TABLE reviews
// FIELDS TERMINATED BY ','
// ENCLOSED BY '"'
// LINES TERMINATED BY '\n'
// (id,name,avatar,numDaysAgo,content);

// allows you to keep track of days by using an auto-incrementer on event;
// SET GLOBAL event_scheduler = ON;

//edit event
// alter event updateReviewAge on schedule every 2 minute;


// let seeder = `THESE ARE MY NOTES ON MYSQL
// LOAD DATA LOCAL INFILE 'MOCK_DATA.csv' INTO TABLE bnb.reviews;
// LOAD DATA LOCAL INFILE 'MOCK_DATA.csv'
// INTO TABLE reviews
// FIELDS TERMINATED BY ','
// ENCLOSED BY '"'
// LINES TERMINATED BY '\n'
// (id,name,avatar,numDaysAgo,content);
// SET GLOBAL event_scheduler = ON;
// alter event updateReviewAge on schedule every 2 minute;`;


// Method for seeding database simultaneously with data creation

const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');

let stream = fs.createReadStream("./data.csv");
let myData = [];
let csvStream = csv
	.parse()
	.on("data", function (data) {
		console.log(data)
		myData.push(data);
	})
	.on("end", function () {
		myData.shift();

		// create a new connection to the database
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'airbnb'
		});

		// open the connection
		connection.connect((error) => {
			if (error) {
				console.error(error);
			} else {
				let query = 'INSERT INTO airbnb.reviews (id,name,avatar,numDaysAgo,content) VALUES ?';
				con.query(query, [myData], (error, response) => {
					console.log(error || response);
				});
			}
		});
	});

stream.pipe(csvStream);

