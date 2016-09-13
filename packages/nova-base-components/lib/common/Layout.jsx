import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FlashContainer} from "meteor/nova:core";
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";
import {withRouter} from 'react-router'

class Layout extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const rootPath = this.props.router.getCurrentLocation().pathname;
        this.context.messages.registerCompont(this, rootPath);
        this.state = this.initialState = {
            isSearching: false,
            isLogin: false,
            popoverMenu: null,
            cachePost: null,
            didMount: false,
            popoverUserCollections: null
        };
    }

    componentDidMount() {
        this.setState({didMount: true});
        //this.context.messages.showPopoverMenu(400, 400, 100, 100, "saveButton");

        const messages = this.context.messages;
        $(document).bind('click touch', function (event) {
            var back = $(event.target).parents().addBack();
            const excludeSelectors = [
                "#save_to_folders_button",
                "#userCollectionPanel",
                "#addNewCollectionButton",
                "#newCollectionForm",
                ".additionalActionButtons_BoErh",
                "#header_right_metamenu",
                "#user-menu"
            ];
            var isClicked = true;
            excludeSelectors.forEach(
              function addNumber(selector) {
                  if ($(event.target).parents().addBack().is(selector)) {
                      isClicked = false;
                  }
              }
            );
            if (isClicked) {
                messages.dismissPopoverMenu();
            }

            //if (!$(event.target).parents().addBack().is("#save_to_folders_button")) {
            //    if (!$(event.target).parents().addBack().is("#userCollectionPanel")) {
            //        if (!$(event.target).parents().addBack().is("#addNewCollectionButton")) {
            //            if (!$(event.target).parents().addBack().is("#newCollectionForm")) {
            //                if (!$(event.target).parents().addBack().is(".additionalActionButtons_BoErh")) {
            //                    if (!$(event.target).parents().addBack().is("#header_right_metamenu")) {
            //                        if (!$(event.target).parents().addBack().is("#user-menu")) {
            //                            messages.dismissPopoverMenu();
            //                        }
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}
        });
    }

    dismissCurrentPostPanel() {
        var lastPath = this.context.messages.dismissPostPanel();
        //this.props.router.push(lastPath)
        this.props.router.goBack();
    }

    showCurrentPostPanel(postId) {
        this.context.messages.pushAndPostShow(postId);
    }

    renderPostSingle() {
        const cachePost = this.state.cachePost;

        const postId = cachePost.postId;
        const params = {
            _id: postId
        };
        return (
          <DocumentContainer
            collection={Posts}
            publication="posts.single"
            selector={{_id: postId}}
            terms={params}
            joins={Posts.getJoins()}
            component={Telescope.components.PostsPage}
            loading={<div className="placeholder_1WOC3">
                <div className="loader_54XfI animationRotate loader_OEQVm"></div>
            </div>}
          />
        )
    }

    renderPosts() {
        if (this.state.didMount) {
            document.body.className = (this.state.cachePost ? "no-scroll" : "");
        }
        if (this.state.cachePost) {
            return (
              <div className="overlay_1AkSl modal-spotlight">
                  <a className="closeDesktop_XydFN" title="Close" data-test="modal-close"
                     onClick={this.dismissCurrentPostPanel.bind(this)}>
                        <span>
                            <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M6 4.586l4.24-4.24c.395-.395 1.026-.392 1.416-.002.393.393.39 1.024 0 1.415L7.413 6l4.24 4.24c.395.395.392 1.026.002 1.416-.393.393-1.024.39-1.415 0L6 7.413l-4.24 4.24c-.395.395-1.026.392-1.416.002-.393-.393-.39-1.024 0-1.415L4.587 6 .347 1.76C-.05 1.364-.048.733.342.343c.393-.393 1.024-.39 1.415 0L6 4.587z"
                                ></path>
                            </svg>
                        </span>
                  </a>
                  <a className="closeMobile_15z3i" title="Close" data-test="modal-close"
                     onClick={this.dismissCurrentPostPanel.bind(this)}>
                        <span>
                            <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M6 4.586l4.24-4.24c.395-.395 1.026-.392 1.416-.002.393.393.39 1.024 0 1.415L7.413 6l4.24 4.24c.395.395.392 1.026.002 1.416-.393.393-1.024.39-1.415 0L6 7.413l-4.24 4.24c-.395.395-1.026.392-1.416.002-.393-.393-.39-1.024 0-1.415L4.587 6 .347 1.76C-.05 1.364-.048.733.342.343c.393-.393 1.024-.39 1.415 0L6 4.587z"
                                ></path>
                            </svg>
                        </span>
                  </a>
                  {this.renderPostSingle()}
              </div>
            )
        }
        return null;
    }

    renderPopoverMenus() {
        const popoverMenu = this.state.popoverMenu;
        if (popoverMenu) {
            switch (popoverMenu.type) {
                case "MoreButton":
                    return (<Telescope.components.HeaderPopoverMenu comp={this.state.popoverMenu}/>);
                case "LoggedUserMenu":
                    return (<Telescope.components.UsersPopoverMenu comp={this.state.popoverMenu}
                                                                   user={this.props.currentUser}/>);
                case "SaveButton":
                    return (<Telescope.components.UserCollectionsPopover comp={this.state.popoverMenu}/>)
            }
        }
    }

    checkUserCollectionUrl(pathname) {
        if (pathname) {
            const split = pathname.split('/');
            if (split.length == 6 && split[1] == "users" && split[3] == "collections") {
                return true;
            }
        }
        return false;
    }

    render() {
        let classValue = "wrapper" + (this.state.isSearching ? " search-mode" : "") + (this.state.cachePost ? " no-scroll" : "");

        const isFolderUrl = this.checkUserCollectionUrl(this.props.location.pathname);

        return (
          <div className={classValue} id="wrapper">

              <Telescope.components.HeadTags />

              <Telescope.components.UsersProfileCheck {...this.props} />

              <div>
                  <Telescope.components.Header {...this.props} />
              </div>

              {/*Rendering the popover menus*/}
              {this.renderPopoverMenus()}

              <div className={this.state.isSearching ? 'overlayActive_oQWJ3' : 'overlayInactive_1UI7W'}></div>

              {/*Popup the top single post detail in pages stack*/}
              {this.renderPosts()}

              {/*Popup the login UI*/}
              {this.state.isLogin ? <Telescope.components.UserLogin /> : null}

              <div id="container">
                  <div className="constraintWidth_ZyYbM container_3aBgK">
                      <FlashContainer component={Telescope.components.FlashMessages}/>
                  </div>

                  <Telescope.components.Newsletter />


                  {isFolderUrl ?
                    this.props.children :
                    <div className="constraintWidth_ZyYbM container_3aBgK">
                        {this.props.children}
                    </div>
                  }


              </div>

              <Telescope.components.Footer {...this.props}/>

          </div>
        )

    }
}

Layout.contextTypes = {
    messages: React.PropTypes.object
};

Layout.displayName = "Layout";

module.exports = withRouter(Layout);
export default withRouter(Layout);