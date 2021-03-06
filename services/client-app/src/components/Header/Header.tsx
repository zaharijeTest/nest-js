import {
  AppBar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  IconButton,
  Divider,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/User.context';
import { logout } from '../../services/auth.service';

import './Header.css';
import { AccountCircle } from '@material-ui/icons';

const Header = ({ title }: { title: string }) => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen((menu) => !menu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen((menu) => !menu);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            onClick={handleMenuItemClick}
            color="inherit"
            style={{ gap: '10px' }}
          >
            <div className="header__user-info">
              <Typography
                component="div"
                className="header__user-info-username"
              >
                {user?.username}
              </Typography>
              <Typography
                component="div"
                className="header__user-info-organization"
              >
                {user?.selectedOrganization?.displayName ||
                  user?.selectedOrganization?.name ||
                  ''}
              </Typography>
            </div>
            <AccountCircle />
          </IconButton>
          <Menu
            className="app-header__menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={(event) => handleMenuItemClick(event)}>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText primary={user?.username || 'Profile'} />
                </ListItemIcon>
              </ListItemButton>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => logout()}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                  <ListItemText primary="Logout" />
                </ListItemIcon>
              </ListItemButton>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
