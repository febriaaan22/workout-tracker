import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box } from '@mui/material';

const Footer: React.FC = () => {

  return (
    <Box
      style={{
        backgroundColor: '#f0f0f0',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box style={{paddingLeft:'20px'}}>
        <Typography variant="h6">
          Versto 
        </Typography>
      </Box>
      <Box style={{paddingRight:'30px'}}>
        {/* Replace 'your_discord_link' and 'your_instagram_link' with your actual links */}
        <IconButton href="https://discord.gg/CfCgUSQm" target="_blank">
          <SportsEsportsIcon />
        </IconButton>
        <IconButton href="https://www.instagram.com/versto.id/" target="_blank">
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
