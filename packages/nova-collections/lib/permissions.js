import Users from 'meteor/nova:users';

const anonymousActions = [
  "collections.view.all"
];
Users.groups.anonymous.can(anonymousActions);

const defaultActions = [
  "collections.view.all"
];
Users.groups.default.can(defaultActions);

const adminActions = [
  "collections.view.all",
  "collections.new",
  "collections.edit.all",
  "collections.remove.all"
];
Users.groups.admins.can(adminActions);
