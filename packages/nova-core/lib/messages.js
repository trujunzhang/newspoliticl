import React, {PropTypes, Component} from 'react';
import PostDetailSet from "./postdetailset.js";
import AppStatus from "./appstatus.js";
import PopoverMenus from "./popovermenus.js"
import UserCollections from "./usercollections"

const Messages = {
    // Local (client-only) collection
    collection: new Meteor.Collection(null),

    flash(content, type) {
        type = (typeof type === 'undefined') ? 'error' : type;
        // Store errors in the local collection
        this.collection.insert({content: content, type: type, seen: false, show: true});
    },

    appStatus: new AppStatus(),
    userCollections: new UserCollections(),
    postDetailSet: new PostDetailSet(),

    layout: Component,
    newsListContainer: null,

    registerNewsListContainer(comp){
        this.newsListContainer = comp;
    },

    resetNewsListContainer(increment){
        if (this.newsListContainer) {
            this.newsListContainer.setState({limit: increment});
        }
    },

    registerCompont(layout, rootPath){
        this.layout = layout;
        this.appStatus.registerLayout(layout, rootPath);
        this.userCollections.registerLayout(layout);
    },

    registerUserCollectionsPopover(comp){
        this.userCollections.registerCompForUserCollectionsPopover(comp);
    },

    pushAndPostShow(postId){
        var cachePost = this.postDetailSet.push(postId);
        this.appStatus.updateCachePost(cachePost);
    },

    dismissPostPanel(){
        var cachePost = this.postDetailSet.lastPage();
        this.appStatus.updateCachePost(cachePost);
        var path = this.appStatus.rootPath;
        return path;
    },

    /**
     * dismiss all post panels
     */
    dismissAllPostPanels(){
        this.postDetailSet.empty();
        this.appStatus.updateCachePost(null);
    },

    showPopoverMenu(top, left, width, height, type){
        var popoverMenus = new PopoverMenus(top, left, width, height, type);
        if (this.layout.state.popoverMenu) {
            this.dismissPopoverMenu();
        } else {
            this.layout.setState({popoverMenu: popoverMenus});
        }
    },

    dismissPopoverMenu(){
        if (this.layout.state.popoverMenu) {
            this.layout.setState({popoverMenu: null});
        }
    },

    markAsSeen(messageId) {
        this.collection.update(messageId, {$set: {seen: true}});
    },

    clear(messageId) {
        this.collection.update(messageId, {$set: {show: false}});
    },

    clearSeen() {
        this.collection.update({seen: true}, {$set: {show: false}}, {multi: true});
    }
};

export default Messages;
