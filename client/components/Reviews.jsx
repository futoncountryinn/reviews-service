const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Review = require('./Review.jsx');
const AllReviewsLightBox = require('./allReviews.jsx');
const Search = require('./Search.jsx');

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      isToggled: false,
    };
  }

  getReviews(cb) {
    var url = document.location.pathname.slice(1);
    url = 'reviews/' + url;
    if (url === '') {
      url = 'reviews/1';
    }
    console.log('url:', url);
    $.ajax({
      url: 'http://3.130.162.52:3003/' + url,
      type: 'GET',
      dataType: 'json',
      success: data => {
        cb(data);
      },
      error: err => {
        throw new Error(err);
      },
    });
  }

  componentDidMount() {
    this.getReviews(reviews => {
      console.log('reviews:', reviews);
      this.setState({
        allReviews: reviews.sort(function(a, b) {
          if (a.date > b.date) {
            return 1;
          } else {
            return -1;
          }
        }),
      });
    });
  }

  render() {
    let sixReviews = this.state.allReviews.slice(0, 6);
    return (
      <div>
        <hr className="hrMargin" />
        <h1>Reviews</h1>
        <div className="allReviews">
          {sixReviews.map(review => (
            <Review
              key={review.id}
              id={review.id}
              name={review.name}
              avatar={review.avatar}
              reviewAge={review.date}
              content={review.content}
              allReviews={this.state.allReviews}
              seeAllReviewsMode={false}
            />
          ))}
        </div>
        <div>
          <AllReviewsLightBox
            allReviews={this.state.allReviews}
            showingAll={this.state.showingAll}
          />
        </div>
      </div>
    );
  }
}

module.exports = Reviews;
