import React from 'react';
//import { Messages } from "meteor/nova:core";

const Header = ({currentUser}) => {

  //const logoUrl = Telescope.settings.get("logoUrl");
  //const siteTitle = Telescope.settings.get("title", "Nova");
  //const tagline = Telescope.settings.get("tagline");

  return (
    <div className="header_2k8Jf">
      <div className="constraintWidth_ZyYbM">
        <Telescope.components.HeaderContent currentUser={currentUser}/>
        <Telescope.components.HeaderNavigation/>
      </div>
    </div>
  )
};

Header.displayName = "Header";

module.exports = Header;
