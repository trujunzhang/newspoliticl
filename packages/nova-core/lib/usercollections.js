class UserCollections {
    registerLayout(layout) {
        this.layout = layout;
        this.postId = "";
    }

    registerCompForUserCollectionsPopover(comp) {
        this.userCollectionsPopover = comp;
        this.userCollectionsPopover.state = this.initialState = {
            addNewItem: false,
            newFolder: null,
            showResult: false,
            value: ''
        };
    }

    resetState(post) {
        this.savedPost = post;
        if (this.userCollectionsPopover) {
            this.userCollectionsPopover.setState({
                addNewItem: false,
                newFolder: null,
                showResult: false,
                value: ''
            });
        }
    }

}

export default UserCollections;
