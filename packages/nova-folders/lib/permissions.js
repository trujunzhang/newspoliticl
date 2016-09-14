import Users from 'meteor/nova:users';

const anonymousActions = [
    "folders.view.all"
];
Users.groups.anonymous.can(anonymousActions);

const defaultActions = [
    "folders.view.approved.all",
    "folders.view.all",
    "folders.insertPost"
];
Users.groups.default.can(defaultActions);

const adminActions = [
    "folders.view.all",
    "folders.new",
    "folders.edit.all",
    "folders.remove.all"
];
Users.groups.admins.can(adminActions);
