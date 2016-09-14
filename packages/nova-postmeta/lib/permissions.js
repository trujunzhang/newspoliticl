import Users from 'meteor/nova:users';

const anonymousActions = [
  "tags.view.all"
];
Users.groups.anonymous.can(anonymousActions);

const defaultActions = [
  "tags.view.all"
];
Users.groups.default.can(defaultActions);

const adminActions = [
  "tags.view.all",
  "tags.new",
  "tags.edit.all",
  "tags.remove.all"
];
Users.groups.admins.can(adminActions);
