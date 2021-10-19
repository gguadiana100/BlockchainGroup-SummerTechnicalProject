import {
  user1, user2, user3,
  user1Brief, user2Brief, user3Brief,
  post1, post2, post3, post4, post5
} from "./FakeBackend";

export const timeSince = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }

  return Math.floor(seconds) + " seconds";
};

export const client = (endpoint, { body, ...customConfig } = {}) => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  if (endpoint === "/auth/me"){
    return new Promise((resolve) => {
      resolve({"data" : user1Brief})
    });
  }

  // TODO: remove ability to click into user profile pages
  //TODO: add specific endpoints for fetching specific user data: loan, bid, borrow, history
  if (endpoint === `/${user1Brief.address}`){
    return new Promise((resolve) => {
      resolve({"data" : user1});
    });
  }

  if (endpoint === `/${user2Brief.address}`){
    return new Promise((resolve) => {
      resolve({"data" : user2});
    });
  }

  if (endpoint === `/${user3Brief.address}`){
    return new Promise((resolve) => {
      resolve({"data" : user3});
    });
  }

  if (endpoint === "/users"){
    return new Promise((resolve) => {
      resolve({"data" : [user1Brief, user2Brief, user3Brief]});
    });
  }

  const all_posts = [post1, post2, post3, post4, post5];

  if (endpoint === "/users/feed"){
    return new Promise((resolve) => {
      resolve({"data" : all_posts});
    });
  }

  if (endpoint === "/posts"){
    return new Promise((resolve) => {
      resolve({"data" : all_posts});
    });
  }
  // TODO: implement fetch all posts available to bidding for current user
  if (endpoint === "/posts/bidding"){
    return new Promise((resolve) => {
      resolve({"data" : [post3, post4, post5]});
    });
  }

  // TODO: implement fetch specific post by address (need to also implement visibility check)
  if (endpoint === "/posts/0x0F595AD6C6297fbeE67EF1348d44a777dD15cE24"){
    return new Promise((resolve) => {
      resolve({"data" : post1});
    });
  }

  if (endpoint === "/posts/0xF4D54031aee4B97dF4e17bd8f771AD7621D269F2"){
    return new Promise((resolve) => {
      resolve({"data" : post2});
    });
  }

  if (endpoint === "/posts/0x1Ce5b91528D5b8EE7599Aa0d11e4C4F36E96C58b"){
    return new Promise((resolve) => {
      resolve({"data" : post3});
    });
  }

  if (endpoint === "/posts/0xC9595e27610b93D9325dfDCa2e7Da6598bB94F18"){
    return new Promise((resolve) => {
      resolve({"data" : post4});
    });
  }

  if (endpoint === "/posts/0x74cb2Ab938cc4F0e77F680Acde53009Cc62aA48a"){
    return new Promise((resolve) => {
      resolve({"data" : post5});
    });
  }




  // return fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, config).then(
  //   async (res) => {
  //     const data = await res.json();
  //
  //     if (res.ok) {
  //       return data;
  //     } else {
  //       return Promise.reject(data);
  //     }
  //   }
  // );
};

export const uploadImage = (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "instaclone");

  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  }).then((res) => res.json());
};
