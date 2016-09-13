import Telescope from 'meteor/nova:lib';

// common

Telescope.registerComponent("App",                  require('./common/App.jsx'));
Telescope.registerComponent("Footer",               require('./common/Footer.jsx'));
Telescope.registerComponent("Header",               require('./common/Header.jsx'));
Telescope.registerComponent("HeaderSearchForm",     require('./common/HeaderSearchForm.jsx'));
Telescope.registerComponent("HeaderContent",        require('./common/HeaderContent.jsx'));
Telescope.registerComponent("HeaderNavigation",     require('./common/HeaderNavigation.jsx'));
Telescope.registerComponent("HeaderPopoverMenu",    require('./common/HeaderPopoverMenu.jsx'));
Telescope.registerComponent("Layout",               require('./common/Layout.jsx'));
Telescope.registerComponent("Logo",                 require('./common/Logo.jsx'));
Telescope.registerComponent("Flash",                require('./common/Flash.jsx'));
Telescope.registerComponent('HeadTags',             require('./common/HeadTags.jsx'));
Telescope.registerComponent("FlashMessages",        require('./common/FlashMessages.jsx'));
Telescope.registerComponent("Newsletter",           require('./common/Newsletter.jsx'));
Telescope.registerComponent("NewsletterButton",     require('./common/NewsletterButton.jsx'));
Telescope.registerComponent("Icon",                 require('./common/Icon.jsx'));
Telescope.registerComponent("SearchForm",           require('./common/SearchForm.jsx'));
Telescope.registerComponent("AppLoading",           require('./common/AppLoading.jsx'));
Telescope.registerComponent("Error404",             require('./common/Error404.jsx'));
Telescope.registerComponent("Loading",              require('./common/Loading.jsx'));
Telescope.registerComponent("Vote",                 require('./common/Vote.jsx'));
Telescope.registerComponent("SettingsEditForm",     require('./common/SettingsEditForm.jsx'));

// posts

Telescope.registerComponent("PostsHome",            require('./posts/PostsHome.jsx'));
Telescope.registerComponent("PostsSingle",          require('./posts/PostsSingle.jsx'));
Telescope.registerComponent("PostsNewButton",       require('./posts/PostsNewButton.jsx'));
Telescope.registerComponent("PostsLoadMore",        require('./posts/PostsLoadMore.jsx'));
Telescope.registerComponent("PostsNoMore",          require('./posts/PostsNoMore.jsx'));
Telescope.registerComponent("PostsNoResults",       require('./posts/PostsNoResults.jsx'));
Telescope.registerComponent("PostsItem",            require('./posts/PostsItem.jsx'));
Telescope.registerComponent("PostsLoading",         require('./posts/PostsLoading.jsx'));
Telescope.registerComponent("PostsViews",           require('./posts/PostsViews.jsx'));
Telescope.registerComponent("PostsList",            require('./posts/PostsList.jsx'));
Telescope.registerComponent("PostsListHeader",      require('./posts/PostsListHeader.jsx'));
Telescope.registerComponent("PostsCategories",      require('./posts/PostsCategories.jsx'));
Telescope.registerComponent("PostsTags",            require('./posts/PostsTags.jsx'));
Telescope.registerComponent("PostsCommenters",      require('./posts/PostsCommenters.jsx'));
Telescope.registerComponent("PostsPage",            require('./posts/PostsPage.jsx'));
Telescope.registerComponent("PostsStats",           require('./posts/PostsStats.jsx'));
Telescope.registerComponent("PostsDaily",           require('./posts/PostsDaily.jsx'));
Telescope.registerComponent("PostsDay",             require('./posts/PostsDay.jsx'));
Telescope.registerComponent("PostsThumbnail",       require('./posts/PostsThumbnail.jsx'));
Telescope.registerComponent("PostsEditForm",        require('./posts/PostsEditForm.jsx'));
Telescope.registerComponent("PostsNewForm",         require('./posts/PostsNewForm.jsx'));
Telescope.registerComponent("PostsCommentsThread",  require('./posts/PostsCommentsThread.jsx'));

Telescope.registerComponent("PostsListTitle",       require('./posts/PostsListTitle.jsx'));


// posts single

Telescope.registerComponent("PostsPopup",           require('./single/PostsPopup.jsx'));
Telescope.registerComponent("PostsSingleHeader",    require('./single/PostsSingleHeader.jsx'));
Telescope.registerComponent("PostDetail",           require('./single/PostDetail.jsx'));
Telescope.registerComponent("PostTagItem",          require('./single/PostTagItem.jsx'));



// comments

Telescope.registerComponent("CommentsItem",         require('./comments/CommentsItem.jsx'));
Telescope.registerComponent("CommentsList",         require('./comments/CommentsList.jsx'));
Telescope.registerComponent("CommentsNode",         require('./comments/CommentsNode.jsx'));
Telescope.registerComponent("CommentsNew",          require('./comments/CommentsNew.jsx'));
Telescope.registerComponent("CommentsEdit",         require('./comments/CommentsEdit.jsx'));
Telescope.registerComponent("CommentsLoadMore",     require('./comments/CommentsLoadMore.jsx'));

Telescope.registerComponent("CommentsNodeList",     require('./comments/CommentsNodeList.jsx'));

// categories

Telescope.registerComponent("CategoriesList",       require('./categories/CategoriesList.jsx'));
Telescope.registerComponent("Category",             require('./categories/Category.jsx'));
Telescope.registerComponent("CategoriesEditForm",   require('./categories/CategoriesEditForm.jsx'));
Telescope.registerComponent("CategoriesNewForm",    require('./categories/CategoriesNewForm.jsx'));

// permissions

Telescope.registerComponent("CanDo",                require('./permissions/CanDo.jsx'));

// users

Telescope.registerComponent("UsersSingle",          require('./users/UsersSingle.jsx'));
Telescope.registerComponent("UsersAccount",         require('./users/UsersAccount.jsx'));
Telescope.registerComponent("UsersEdit",            require('./users/UsersEdit.jsx'));
Telescope.registerComponent("UsersProfile",         require('./users/UsersProfile.jsx'));
Telescope.registerComponent("UsersProfileCheck",    require('./users/UsersProfileCheck.jsx'));
Telescope.registerComponent("UsersAvatar",          require('./users/UsersAvatar.jsx'));
Telescope.registerComponent("UsersName",            require('./users/UsersName.jsx'));
Telescope.registerComponent("UsersMenu",            require('./users/UsersMenu.jsx'));
Telescope.registerComponent("UsersAccountMenu",     require('./users/UsersAccountMenu.jsx'));
Telescope.registerComponent("UsersAccountForm",     require('./users/UsersAccountForm.jsx'));

// just for test
Telescope.registerComponent("UsersAccountMenuBase", require('./users/UsersAccountMenuBase.jsx'));

Telescope.registerComponent("UserProfileHeader",    require('./users/UserProfileHeader.jsx'));
Telescope.registerComponent("UserLogin",            require('./users/UserLogin.jsx'));
Telescope.registerComponent("UsersPopoverMenu",     require('./users/UsersPopoverMenu.jsx'));

// widget for Calendar
Telescope.registerComponent("WidgetCalendar",       require('./widgetscalendar/WidgetCalendar.jsx'));
Telescope.registerComponent("DayNames",             require('./widgetscalendar/DayNames.jsx'));
Telescope.registerComponent("Week",                 require('./widgetscalendar/Week.jsx'));

// widget for Topics
Telescope.registerComponent("WidgetTopics",         require('./widgettopics/WidgetTopics.jsx'));

// sidebar
Telescope.registerComponent("WidgetHeader",         require('./sidebar/WidgetHeader.jsx'));


// collections
Telescope.registerComponent("UserCollectionsPopover",   require('./collections/UserCollectionsPopover.jsx'));
Telescope.registerComponent("CollectionsList",          require('./collections/CollectionsList.jsx'));
Telescope.registerComponent("CollectionsLoading",       require('./collections/CollectionsLoading.jsx'));
Telescope.registerComponent("CollectionsResult",        require('./collections/CollectionsResult.jsx'));

Telescope.registerComponent("FoldersList",              require('./collections/FoldersList.jsx'));
Telescope.registerComponent("FoldersItem",              require('./collections/FoldersItem.jsx'));




