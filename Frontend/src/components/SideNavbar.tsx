import React, { useEffect, useState } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
  Typography,
  Box,
  Button,
} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PoolIcon from '@mui/icons-material/Pool';
import CalculateIcon from '@mui/icons-material/Calculate';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WidgetsIcon from '@mui/icons-material/Widgets';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import './SideNavbar.css';
import logo from '../pages/image/versto.png';
import ModalProfile from './ModalProfile';

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleOpenProfile = () => {
    console.log('Fetching or updating profile data...');
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
  };

  const handleHelpSupportClick = () => {
    window.location.href = 'https://linktr.ee/alyuzasp';
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/');
      }
    });
  };

  const icons = [
    <DirectionsRunIcon />,
    <DirectionsBikeIcon />,
    <PoolIcon />,
    <CalculateIcon />,
    <RestaurantMenuIcon />,
    <HelpOutlineIcon />,
  ];

  const handleMenuClick = (menuItem: string) => {
    navigate(`/${menuItem.toLowerCase().replace(/\s+/g, '-')}`);
    // Adjust the navigation path based on your routing setup
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const drawer = (
    <Box style={{ width: '250px', backgroundColor: 'white', height: '100vh' }}>
      <List>
        {['Running', 'Cycling', 'Swimming', 'BMI Calculator', 'Healthy Tips'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ '&:hover': { backgroundColor: '#1de9b6' } }}>
            <ListItemButton onClick={() => handleMenuClick(text)}>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding sx={{ '&:hover': { backgroundColor: '#1de9b6' } }}>
          <ListItemButton onClick={handleHelpSupportClick}>
            <HelpOutlineIcon />
            <ListItemText primary="Help & Support" />
          </ListItemButton>
        </ListItem>

        {screenWidth < 600 && (
          <>
            <Divider />
            <ListItem disablePadding onClick={handleOpenProfile} sx={{ '&:hover': { backgroundColor: '#1de9b6' } }}>
              <ListItemButton>
                <AccountCircleIcon />
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={handleLogout} sx={{ '&:hover': { backgroundColor: '#d50000' } }}>
              <ListItemButton>
                <LogoutIcon />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Box className="sticky-navbar">
        <Box>
          <a href="#">
            <img src={logo} alt="Logo" style={{ width: '140px', height: '50px' }} />
          </a>
        </Box>

        <Box style={{ display: 'flex', gap: '25px' }}>
          {screenWidth > 600 && (
            <>
              <Button className={'navbar-item'} onClick={toggleDrawer} style={{ color: 'white' }}>
                <WidgetsIcon />
                <Typography style={{ color: 'white' }}>MENU</Typography>
              </Button>

              <Button className={'navbar-item'} onClick={handleOpenProfile} style={{ color: 'white' }}>
                <AccountCircleIcon />
                <Typography style={{ color: 'white' }}>PROFILE</Typography>
              </Button>

              <Button className={'navbar-item-logout'} onClick={handleLogout} style={{ color: 'white' }}>
                <LogoutIcon />
                <Typography style={{ color: 'white' }}>LOGOUT</Typography>
              </Button>

            </>
          )}
          {screenWidth < 600 && (
            <>
              <IconButton onClick={toggleDrawer} style={{ color: 'white' }}>
                <MenuIcon />
              </IconButton>
            </>
          )}

        </Box>
      </Box>

      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        {drawer}
      </Drawer>

      <ModalProfile open={profileOpen} onClose={handleCloseProfile} />
    </>
  );
};

export default SideNav;
