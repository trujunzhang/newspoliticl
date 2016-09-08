class CachePost {
  constructor(postId) {
    this.postId = postId;
    this.ready = false;
  }

  registerPost(comp) {
    this.comp = comp;
    this.fetchPost();
  }

  fetchPost() {
    const subscription = Meteor.subscribe('posts.single', {_id: this.postId});
    const document = Posts.findOne({_id: this.postId});
    this.ready = true;
    this.comp.setLoading(true);
    //this.comp.setState({loading: this.ready});
  }
}

export default CachePost;
