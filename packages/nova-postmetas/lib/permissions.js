import Users from 'meteor/nova:users';

const anonymousActions = [
  "postmetas.view.all"
];
Users.groups.anonymous.can(anonymousActions);

const defaultActions = [
  "postmetas.view.all"
];
Users.groups.default.can(defaultActions);

const adminActions = [
  "postmetas.view.all",
  "postmetas.new",
  "postmetas.edit.all",
  "postmetas.remove.all"
];
Users.groups.admins.can(adminActions);
