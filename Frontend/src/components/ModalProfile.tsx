// ModalProfile.tsx
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Slide,
  Paper,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import axios from 'axios';
import { API } from '../pages/utils/API';

interface ModalProfileProps {
  open: boolean;
  onClose: () => void;
}

interface ProfileData {
  fullname: string;
  username: string;
}

const ModalProfile: React.FC<ModalProfileProps> = ({ open, onClose }) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const validate = localStorage.getItem('token');
      try {
        const response = await axios.get(API + '/api/profile', {
          headers: { Authorization: `Bearer ${validate}` },
        });
        setProfileData(response.data.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
           sx={{
            position: 'absolute',
            top: '30%',
            left: '40%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            borderRadius: 8,
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
          }}
        >
          <Typography variant="h6">Profile</Typography>
          <Divider />
          {profileData ? (
            <>
              <Typography>Full Name: {profileData.fullname}</Typography>
              <Typography>Username: {profileData.username}</Typography>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
          <Button onClick={onClose}>Close</Button>
        </Paper>
      </Slide>
    </Modal>
  );
};

export default ModalProfile;
