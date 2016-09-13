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
        selector={{}}
        terms={{'_id': props.params.cid}}
        component={Telescope.components.UsersFolderProfile}
        joins={Folders.getJoins()}
      />
    )
};

UsersFolder.displayName = "UsersFolder";

module.exports = UsersFolder;