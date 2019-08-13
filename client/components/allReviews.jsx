const React = require('react');
const Review = require('./Review.jsx');
const $ = require('jquery');
const Search = require('./Search.jsx');

// consider using a portal for this component
class AllReviewsLightBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false,
      numReviewsShowing: 1,
      reviews: this.props.allReviews,
      filterApplied: false,
    };
    this.seeAllReviews = this.seeAllReviews.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.repopulateListForFilter = this.repopulateListForFilter.bind(this);
  }

  //toggle between viewing all and not viewing all
  seeAllReviews(e) {
    if (e.target !== e.currentTarget) return;
    this.setState({
      isToggled: !this.state.isToggled,
      reviews: this.props.allReviews,
    });
  }

  // loads olders reviews as user scrolls to bottom of list
  scrollHandler(e) {
    let element = e.target;
    //console.log(element.scrollHeight + ' - ' + element.scrollTop + ' === ' + (element.scrollHeight - element.scrollTop) + ' || NEEDS TO BE ' + element.clientHeight)
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      if (this.state.filterApplied) {
        setTimeout(
          () =>
            this.setState({
              reviews: this.state.reviews.slice(0, this.state.numReviewsShowing++ * 7),
            }),
          300,
        );
      } else {
        setTimeout(
          () =>
            this.setState({
              reviews: this.props.allReviews.slice(0, this.state.numReviewsShowing++ * 7),
            }),
          300,
        );
      }
    }
  }

  // shows reviews based on searched string
  repopulateListForFilter(reviews) {
    this.setState({
      reviews: reviews,
      filterApplied: true,
    });

    // check if all reviews have been loaded
    if (reviews.length === this.state.reviews) {
      this.setState({
        filterApplied: false,
        numReviewsShowing: 1,
      });
    }
  }

  // this renders all the messages
  renderSevenMessages(reviews) {
    // assigns loading gif to bottom of reviews if there are more reviews to load
    let loadingGif = reviews => {
      if (reviews.length < this.props.allReviews.length && !this.state.filterApplied) {
        return <img className="loadingGif" src="./imgs/loading.gif" />;
      } else {
        return <p className="loadingGif">That's all the reviews!</p>;
      }
    };

    return (
      <div
        className="transparentBackground"
        onClick={this.seeAllReviews}
        onScroll={this.scrollHandler}
      >
        <div id="allReviewsLightBox">
          <img src="../imgs/x.png" className="allReviewsExitButton" onClick={this.seeAllReviews} />
          <h1>{this.state.reviews.length} reviews</h1>
          <Search reviews={this.props.allReviews} filter={this.repopulateListForFilter} />
          {reviews.map(review => (
            <div>
              <Review
                key={review.id}
                id={review.id}
                name={review.name}
                avatar={review.avatar}
                reviewAge={review.numDaysAgo}
                content={review.content}
                allReviews={this.state.allReviews}
                seeAllReviewsMode={true}
              />
              <hr />
            </div>
          ))}
          <div>{loadingGif(reviews)}</div>
        </div>
      </div>
    );
  }

  render() {
    // renders either a lightbox to see all reviews or a button to open the lightbox
    if (this.state.isToggled) {
      const reviews = this.state.reviews.slice(0, this.state.numReviewsShowing++ * 7);
      return this.renderSevenMessages(reviews);
    } else {
      return (
        <p className="seeAllReviews" onClick={this.seeAllReviews}>
          {' '}
          See All Reviews
        </p>
      );
    }
  }
}

module.exports = AllReviewsLightBox;
