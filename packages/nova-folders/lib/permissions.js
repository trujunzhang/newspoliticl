import Users from 'meteor/nova:users';

const anonymousActions = [];
Users.groups.anonymous.can(anonymousActions);

const defaultActions = [
    "folders.view.approved.all",
    "folders.insertPost",
    "folders.view.all",
    "folders.new",
    "folders.edit.all",
    "folders.remove.all"
];
Users.groups.default.can(defaultActions);

const adminActions = [];
Users.groups.admins.can(adminActions);
