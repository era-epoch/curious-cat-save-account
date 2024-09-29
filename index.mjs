import fs from 'node:fs';
import { exit } from 'node:process';

const username = process.argv[2];
console.log(`Fetching posts from account: ${username}`);
const now = Math.floor(Date.now() / 1000);
let timestamp = now;
let allPosts = [];
let data = {};

do {
  console.log(`Fetching with timestamp: ${timestamp}`);
  const query = `https://curiouscat.live/api/v2.1/profile?username=${username}&_ob=noregisterOrSignin2&max_timestamp=${timestamp}`;
  const response = await fetch(query);
  data = await response.json();
  if (!data.hasOwnProperty("posts")) {
    console.log("No posts found for that username, please check the spelling");
    exit();
  }
  allPosts.push(data.posts);
  if (data.posts.length > 0) {
    timestamp = data.posts[data.posts.length - 1].post.timestamp - 1;
  }
} while (data.posts.length > 0);

console.log(`# of fetched posts: ${posts.length}`);

fs.writeFileSync("posts.json", JSON.stringify(allPosts));
