class AppStatus {
    registerLayout(layout, rootPath) {
        this.layout = layout;
        this.rootPath = rootPath;
        this.singlePostId = '';
    }

    isSearching(search) {
        this.layout.setState({isSearching: search})
    }

    updateCachePost(cachePost) {
        this.singlePostId = '';
        this.layout.setState({cachePost: cachePost});
    }

    updateCurrentPostPageState(postId) {
        this.singlePostId = postId;
    }

    showLoginUI() {
        this.layout.setState({isLogin: true})
    }

    dismissLoginUI() {
        this.layout.setState({isLogin: false})
    }

    popoverRightMenu() {

    }

    dismissRightMenu() {
    }

    /**
     *
     * @param params
     */
    //pushNewParams(params) {
    //    this.postsHome.setState({postPostParams: params})
    //}
}

export default AppStatus;
