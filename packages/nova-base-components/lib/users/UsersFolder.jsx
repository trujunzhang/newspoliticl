import Telescope from 'meteor/nova:lib';
import React from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';
import Folders from 'meteor/nova:folders';

const UsersFolder = (props, context) => {
    return (
      <DocumentContainer
        collection={Folders}
        publication="folders.single"
        selector={{'telescope.slug': props.params.slug}}
        terms={{'telescope.slug': props.params.slug}}
        component={Telescope.components.UsersFolderProfile}
        documentPropName="user"
        joins={Users.getJoins()}
      />
    )
};

UsersFolder.displayName = "UsersFolder";

module.exports = UsersFolder;