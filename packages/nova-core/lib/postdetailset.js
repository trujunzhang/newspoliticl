import CachePost from "./cachepost.js";

class PostDetailSet {
  constructor() {
    this.stack = [];
  }

  push(postId) {
    let newPost = new CachePost(postId);
    this.stack.push(newPost);
    return newPost;
  }

  lastPage() {
    if (this.stack.length == 0) {
      return null;
    }
    this.stack.pop();
    var lastPost = this.stack[this.stack.length - 1];
    return lastPost;
  }

  fetchPostPage(postId) {
    return postId
  }
}

export default PostDetailSet;
