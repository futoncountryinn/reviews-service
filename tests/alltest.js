import Review from '../client/components/Review.jsx';
import Reviews from '../client/components/Reviews.jsx';

const Review = require('../client/components/Review.jsx');
const Reviews = require('../client/components/Reviews.jsx');

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Reviews /> );
});

describe('<Reviews /> rendering 6 Review Components', () => {
  it('should render 6 reviews', () => {
    expect(wrapper.find('Review')).to.have.lengthOf(6);
  });

  it('should display a userName', () => {
    expect(wrapper.find('header')).toHaveLength(1);
  });

  it('should have a number of days old ', () => {
    expect(wrapper.find(Review).props().reviewAge).not.toBeNaN();
  });

});