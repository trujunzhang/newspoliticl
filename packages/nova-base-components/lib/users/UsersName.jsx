import React, {PropTypes, Component} from 'react';
import Users from 'meteor/nova:users';
import {Link} from 'react-router';

const UsersName = ({user}) => <Link className="boldText_3B8fa text_3Wjo0 default_tBeAo base_3CbW2"
                                    to={Users.getProfileUrl(user)}>{Users.getDisplayName(user)}</Link>;

UsersName.propTypes = {
  user: React.PropTypes.object.isRequired,
};

UsersName.displayName = "UsersName";

module.exports = UsersName;
export default UsersName;