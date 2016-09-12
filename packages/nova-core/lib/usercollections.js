class UserCollections {
    registerLayout(layout) {
        this.layout = layout;
    }

    registerCompForUserCollectionsPopover(comp) {
        this.userCollectionsPopover = comp;
        this.resetState(null);
    }

    resetState(post) {
        this.userCollectionsPopover.state = this.initialState = {
            addNewItem: false,
            showResult: false,
            value: 'wanghao-folder'
        };
        this.post = post;
    }

}

export default UserCollections;
