import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import { API } from '../../utils/API';
import '../LoginRegister.css';
import logo from '../../image/versto.png';

interface LoginInterface {
  username: string;
  password: string;
}

const initialValues: LoginInterface = {
  username: '',
  password: '',
};

const validationSchema = yup.object({
  username: yup.string().required("Sorry, username can't be blank"),
  password: yup.string().required("Please enter your password here"),
});

const Login: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigate = useNavigate();
  const handleSubmit = async (values: LoginInterface) => {
    const body = {
      username: values.username,
      password: values.password,
    };

    try {
      const response = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Error while login');
      }

      const data = await response.json();
      localStorage.setItem('token', data.data);
      navigate('/running');
      Swal.fire("Login Success!");
    } catch (error) {
      console.error(error);
      Swal.fire("Login Failed!");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className='boxBackground'
        display="flex"
        flexDirection={'column'}
        justifyContent="center"
        alignItems="center"
        height="100vh"
        style={{ backgroundColor: '#263238' }}
      >
        <Box className={'verstoLogo'}>
          <a href="#">
            <img src={logo} alt="Logo" style={{ width: '200px', height: '60px' }} />
          </a>
        </Box>
        <Card className={`auth-animation ${isVisible ? 'visible' : ''}`}
          style={{
            padding: '20px',
            maxWidth: '350px',
            backgroundColor: 'white',
            borderRadius: '24px',
          }}
        >
          <Typography
            className="login-head"
            variant="h5"
            component="div"
            style={{ textAlign: 'center', margin: '16px' }}
          >
            Login to Website
          </Typography>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{
              marginTop: '16px',
              borderRadius: '24px',
              backgroundColor: '#b71c1c',
            }}
          >
            Login
          </Button>

          <Typography style={{ textAlign: 'center', padding: '20px' }}>
            Don't have an account?
            <a onClick={() => navigate('/register')}>
              <strong className="auth-text"> Register</strong>
            </a>
          </Typography>
        </Card>
      </Box>
    </form>
  );
};

export default Login;
