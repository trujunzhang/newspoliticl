class UserCollections {
    registerLayout(layout) {
        this.layout = layout;
        this.postId = "";
    }

    registerCompForUserCollectionsPopover(comp) {
        this.userCollectionsPopover = comp;
        this.userCollectionsPopover.state = this.initialState = {
            addNewItem: false,
            showResult: false,
            value: ''
        };
    }

    resetState(postId) {
        this.postId = postId;
        if (this.userCollectionsPopover) {
            this.userCollectionsPopover.setState({
                addNewItem: false,
                showResult: false,
                value: ''
            });
        }
    }

}

export default UserCollections;
