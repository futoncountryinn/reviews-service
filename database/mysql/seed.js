const fs = require('fs');
const mysql = require('mysql');

// const data = fs.readFileSync('data.json');
let data = JSON.parse(fs.readFileSync('data.json') + '');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'airbnb'
});

// open the connection
connection.connect((error) => {
	data.forEach(review => {
		if (error) {
			console.error(error);
		} else {
			// let query = 'INSERT INTO airbnb.reviews (name, entry_id, avatar,date,content) VALUES (?, ?, ?, ?, ?)';
			// connection.query(query, [review.name, review.entry_id, review.avatar, review.date, review.content], (error, response) => {
			// 	console.log(error || response);
			// });
			LOAD DATA INFILE 'path/to/file.csv'
			INTO TABLE table_name
			FIELDS TERMINATED BY ','
			ENCLOSED BY '"'
			LINES TERMINATED BY '\n'
		}
	})
});



