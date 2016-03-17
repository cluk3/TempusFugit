import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import config from '../../../config';

const NavHeader = (props) => {
  const {
    isAuthenticated,
    onLogoutClick,
    linkTo,
    isLeftNavOpen,
    handleLeftNavToggle
  } = props;
  return (
    <AppBar
    title = {<span>{config.app.name}</span>}
    iconElementLeft={
      <IconButton onTouchTap={handleLeftNavToggle}>
        {isLeftNavOpen ? <NavigationClose /> : <NavigationMenu />}
      </IconButton>
    }
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        { !isAuthenticated &&
        <MenuItem primaryText="Sign in"
          onTouchTap = { () => linkTo('/signin') }/>
        }
        { !isAuthenticated &&
        <MenuItem primaryText="Sign up"
          onTouchTap = { () => linkTo('/signup') }/>
        }
        { isAuthenticated &&
        <MenuItem primaryText="Change Password"
          onTouchTap = { () => linkTo('/change-password') }/>
        }
        { isAuthenticated &&
        <MenuItem primaryText="Log out"
          onTouchTap = { () => onLogoutClick() }/>
        }
      </IconMenu>
    }>
    </AppBar>
  );
};


export default NavHeader;
