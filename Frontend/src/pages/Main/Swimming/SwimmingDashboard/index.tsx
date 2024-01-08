import React, { useEffect, useState } from 'react';
import { Button, Divider, Paper, TablePagination, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SideNav from '../../../../components/SideNavbar';
import { API } from '../../../utils/API';
import Footer from '../../../../components/Footer';
import mapsImage from '../../../image/maps.jpg';
import Swal from 'sweetalert2';
import './style.css'

interface Activity {
  _id: string;
  title: string;
  description: string;
  distance: number;
  time: number;
  calorie: number;
  activityType: string;
  date: string;
}

const SwimmingDashboard: React.FC = () => {
  const navigate = useNavigate();
  const validate = localStorage.getItem('token');
  if (!validate) {
    navigate('/');
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [dataList, setData] = useState<Activity[]>([]);
  const [filteredData, setFilteredData] = useState<Activity[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    distance: 0,
    time: 0,
    date: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    title: '',
    description: '',
    distance: '',
    time: '',
    date: ''
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const swimmingActivities = dataList.filter((activity) => activity.activityType === 'swimming'); // Filtering activity type
    setFilteredData(swimmingActivities);
  }, [dataList]);

  const totalDistance = filteredData.reduce((acc, activity) => acc + activity.distance, 0);
  const totalTime = filteredData.reduce((acc, activity) => acc + activity.time, 0);
  const totalCalorie = filteredData.reduce((acc, activity) => acc + activity.calorie, 0);

  const fetchData = async () => {
    try {
      const response = await axios.get(API + '/api/tasks', {
        headers: { Authorization: `Bearer ${validate}` },
      });
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    if (formData.distance <= 0) {
      errors.distance = 'Distance should be more than 0';
    }
    if (formData.time <= 0) {
      errors.time = 'Time should be more than 0';
    }
    const selectedDate = new Date(formData.date);
    if (isNaN(selectedDate.getTime())) {
      errors.date = 'Date is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleEdit = (activity: Activity) => {
    setSelectedActivity(activity);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.put(`${API}/api/tasks/${selectedActivity?._id}`, formData, {
          headers: { Authorization: `Bearer ${validate}` },
        });
        fetchData();
        setEditModalOpen(false);
        setFormData({ title: '', description: '', distance: 0, time: 0, date: '' });
        setFormErrors({ title: '', description: '', distance: '', time: '' });
        setSelectedActivity(null);
        Swal.fire('Workout has been updated!');
      } catch (error) {
        console.error(error);
        Swal.fire('Failed to update activity!');
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${validate}` },
      });
      fetchData();
      Swal.fire('Workout has been deleted!');
    } catch (error) {
      console.error(error);
      Swal.fire('Failed to delete activity!');
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.post(API + '/api/tasks/swimming', formData, {
          headers: { Authorization: `Bearer ${validate}` },
        });
        fetchData();
        setModalOpen(false);
        setFormData({ title: '', description: '', distance: 0, time: 0, date: '' });
        setFormErrors({ title: '', description: '', distance: '', time: '' });
        Swal.fire('Successfully added activity!');
      } catch (error) {
        console.error(error);
        Swal.fire('Failed to add activity.');
      }
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <SideNav />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Paper className={'paperDashboard'}
          sx={{ borderRadius: '20px', backgroundColor: 'white', color: 'black', margin: '10px', flexGrow: 1, }}
          elevation={5}
        >
          <Box sx={{ padding: '30px' }}>
            <Typography variant="h3" gutterBottom>
              Swimming Activity
            </Typography>
            <Typography variant="h5" gutterBottom>
              Total Distances: {totalDistance.toFixed(1)} km
            </Typography>
            <Typography variant="h5" gutterBottom>
              Total Workout: {totalTime.toFixed(1)} minutes
            </Typography>
            <Typography variant="h5" gutterBottom>
              Total Calorie Burn: {totalCalorie.toFixed(1)} cal
            </Typography>
            <Button variant="outlined" onClick={handleOpenModal} sx={{ mt: 2 }}>
              Add Activity
            </Button>
          </Box>

          <Divider />

          <Box className={'activityPadding'}>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((activity, index) => (
                <Paper
                  key={index}
                  sx={{
                    borderRadius: '15px', margin: '10px', padding: '20px', backgroundColor: 'white',
                  }}
                  elevation={2}
                ><Box className={'activityBox'}>
                    <Box className={'activityImage'}>
                      <a href='https://www.google.com/maps' target="_blank">
                        <img
                          src={mapsImage}
                          alt={`Activity ${index + 1}`}
                          style={{ borderRadius: '10px', maxWidth: '100%', marginBottom: '10px' }}
                        />
                      </a>
                    </Box>
                    <Box className={'activityDescription'}>
                      <Typography variant="h5" gutterBottom>
                        {activity.title}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {activity.description}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Distance: {activity.distance.toFixed(1)} km
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Time: {activity.time.toFixed(1)} minutes
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Calorie Burn: {activity.calorie.toFixed(1)} cal
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Date: {activity.date}
                      </Typography>
                      <Button variant="outlined" onClick={() => handleEdit(activity)} sx={{ mr: 1 }}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(activity._id)}>
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              ))}
          </Box>

          <TablePagination
            sx={{ marginRight: '20px' }}
            rowsPerPageOptions={[5]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={() => { }}
          />

          {/*Add Modal*/}
          <Dialog open={isModalOpen} onClose={handleCloseModal}>
            <DialogTitle>Add Activity</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                fullWidth
                margin="normal"
                required
                error={!!formErrors.title}
                helperText={formErrors.title}
              />
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                fullWidth
                margin="normal"
                required
                error={!!formErrors.description}
                helperText={formErrors.description}
              />
              <TextField
                label="Distance (km)"
                type="number"
                value={formData.distance}
                onChange={(e) =>
                  setFormData({ ...formData, distance: Number(e.target.value) })
                }
                fullWidth
                margin="normal"
                required
                error={!!formErrors.distance}
                helperText={formErrors.distance}
              />
              <TextField
                label="Time (minutes)"
                type="number"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: Number(e.target.value) })
                }
                fullWidth
                margin="normal"
                required
                error={!!formErrors.time}
                helperText={formErrors.time}
              />
              <TextField
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                fullWidth
                margin="normal"
                required
                error={!!formErrors.date}
                helperText={formErrors.date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button onClick={handleSubmit}>Done</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={isEditModalOpen} onClose={handleEditModalClose}>
            <DialogTitle>Edit Activity</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                fullWidth
                margin="normal"
                required
                error={!!formErrors.title}
                helperText={formErrors.title}
              />
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                fullWidth
                margin="normal"
                required
                error={!!formErrors.description}
                helperText={formErrors.description}
              />
              <TextField
                label="Distance (km)"
                type="number"
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: Number(e.target.value) })}
                fullWidth
                margin="normal"
                required
                error={!!formErrors.distance}
                helperText={formErrors.distance}
              />
              <TextField
                label="Time (minutes)"
                type="number"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: Number(e.target.value) })}
                fullWidth
                margin="normal"
                required
                error={!!formErrors.time}
                helperText={formErrors.time}
              />
              <TextField
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                fullWidth
                margin="normal"
                required
                error={!!formErrors.date}
                helperText={formErrors.date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditModalClose}>Cancel</Button>
              <Button onClick={handleEditSubmit}>Done</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default SwimmingDashboard;
