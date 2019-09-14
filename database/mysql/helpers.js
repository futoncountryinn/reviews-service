const mysql = require('mysql');   // mysql -u root -p < database/schema.sql
const config = require('./config');
const faker = require('faker');

// CONNECT TO MYSQL WITH CREDENTIALS
var connection = mysql.createConnection({ ...config });
const db = {};

// CHECK CONNECTION
connection.connect((err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('mysqlConnection successful')
  }
})

// GET REVIEWS
db.getReviews = (id, callback) => {
  connection.query(`SELECT * FROM reviews where entry_id = ${id}`, (err, response) => {
    if (err) callback(err);
    callback(err, response);
  })
}

// CREATE A REVIEW
db.createReview = (data, callback) => {

  connection.query(`INSERT INTO airbnb.reviews (name, entry_id, avatar, date, content) VALUES ('${data.name}', '${data.entry_id}', '${data.avatar}', '${data.date.slice(0, data.date.indexOf('T'))}', '${data.content}')`, (err, response) => {
    callback(err, response);
  });
}

// UPDATE A REVIEW
db.updateReview = (data, callback) => {
  connection.query(`UPDATE airbnb.reviews SET content = ? WHERE id = ?`, [data.content, data.id]), (err, response) => {
    callback(err, response);
  }
}

// DELETE A REVIEW
db.deleteReview = (data, callback) => {
  connection.query('DELETE FROM airbnb.reviews WHERE id = ?', [data.id], (err, response) => {
    if (err) callback(err);
    callback(err, response);
  })
};

module.exports = db;