class AppStatus {
    registerPostsHome(postsHome) {
        this.postsHome = postsHome;
    }

    registerLayout(layout) {
        this.layout = layout;
    }

    isSearching(search) {
        this.layout.setState({isSearching: search})
    }

    updateCachePost(cachePost) {
        this.layout.setState({cachePost: cachePost});
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

    pushUrl(path) {
        this.postsHome.setState({postPostUrl: path})
    }
}

export default AppStatus;
