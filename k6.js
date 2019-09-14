import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export let errorRate = new Rate("errors");

export default function () {
  const id = Math.floor(Math.random() * 10000000);
  if (id % 2 === 0) {
    const url = 'http://localhost:3003/' + id;
    check(http.get(url), {
      "status is 200": (res) => res.status == 200
    }) || errorRate.add(1);
  } else {
    const url = 'http://localhost:3003/reviews/add';
    const review = {};
    review.name = 'Ralph'
    review.avatar = `https://sdc-reviews-avatars.s3.us-east-2.amazonaws.com/5389.jpg`;
    review.date = '2015-03-24';
    review.entry_id = Math.floor(Math.random() * 10000000);
    review.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultrices condimentum est, a facilisis velit interdum vel. Curabitur dignissim pretium elit id sodales. Aenean sagittis vel nulla et eleifend. Etiam porta turpis ornare arcu blandit, at pellentesque arcu bibendum. Nullam condimentum neque nisi, vitae gravida diam efficitur sit amet. Vivamus et orci sem.'
    check(http.post(url, review), {
      "status is 200": (res) => res.status === 200
    }) || errorRate.add(1);
  };
}

export const options = {
  rps: 3000,
  vus: 50,
  duration: '120s'
}