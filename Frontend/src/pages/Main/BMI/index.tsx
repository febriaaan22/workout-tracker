import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { API } from '../../utils/API';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../../../components/Footer';
import SideNav from '../../../components/SideNavbar';

interface BmiData {
  weight: number;
  height: number;
  age: number;
  bmi: number;
  category: string;
  date: string;
}

const BmiCalculator: React.FC = () => {
  const navigate = useNavigate();
  const validate = localStorage.getItem('token');
  if (!validate) {
    navigate('/');
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formData, setFormData] = useState({ weight: 0, height: 0, age: 0 });
  const [history, setHistory] = useState<BmiData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(6); // Change this to your preferred number

  const fetchData = async () => {
    try {
      const response = await axios.get(API + '/api/bmicalculator', {
        headers: { Authorization: `Bearer ${validate}` },
      });

      if (Array.isArray(response.data.data)) {
        setHistory(response.data.data);
      } else {
        console.error('Invalid response data');
      }
    } catch (error) {
      console.error('Error fetching BMI data:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: parseFloat(event.target.value) || 0,
    });
  };

  const handleCalculateBmi = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(API + '/api/bmicalculator', formData, {
        headers: { Authorization: `Bearer ${validate}` },
      });

      setHistory([...history, response.data]);
      Swal.fire('Success!');
      console.log('Calculating BMI...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error calculating BMI:', error);
      Swal.fire('Failed!');
    }
  };

  const handleClearHistory = async () => {
    try {
      Swal.fire({
        title: 'Are you sure to clear history?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(API + '/api/bmicalculator', {
            headers: { Authorization: `Bearer ${validate}` },
          });
          setHistory([]);
        }
      });
    } catch (error) {
      console.error('Error clearing BMI history:', error);
      Swal.fire('Failed to clear history!');
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'blue';
      case 'Normal weight':
        return 'green';
      case 'Overweight':
        return 'orange';
      case 'Obese':
        return 'red';
      default:
        return 'black'; // Default color if category is not recognized
    }
  };

  return (
    <>
      <SideNav />
      <Container maxWidth="lg">
        <Grid container spacing={3} minHeight={'100vh'}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <Typography variant="h5" gutterBottom>
                BMI Calculator
              </Typography>
              <TextField
                label="Weight (kg)"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Height (cm)"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit" color="primary" onClick={handleCalculateBmi}>
                Calculate BMI
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ minWidth: '80px' }}>Date</TableCell>
                      <TableCell>Weight (Kg)</TableCell>
                      <TableCell>Height (Cm)</TableCell>
                      <TableCell>BMI</TableCell>
                      <TableCell>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((entry) => (
                        <TableRow key={entry.date}>
                          <TableCell>{entry.date}</TableCell>
                          <TableCell>{entry.weight}</TableCell>
                          <TableCell>{entry.height}</TableCell>
                          <TableCell>{entry.bmi.toFixed(1)}</TableCell>
                          <TableCell style={{ color: getCategoryColor(entry.category) }}>{entry.category}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[6]}
                component="div"
                count={history.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClearHistory}
              >
                Clear History
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default BmiCalculator;
