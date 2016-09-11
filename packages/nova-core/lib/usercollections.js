class UserCollections {
    registerLayout(layout) {
        this.layout = layout;
    }

    registerCompForUserCollectionsPopover(comp) {
        this.userCollectionsPopover = comp;
        this.resetState();
    }

    resetState() {
        this.userCollectionsPopover.state = this.initialState = {
            addNewItem: false,
            showResult: false,
            value: 'wanghao-folder'
        };
    }

}

export default UserCollections;
