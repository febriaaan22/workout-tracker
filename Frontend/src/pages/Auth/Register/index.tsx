import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import { API } from '../../utils/API';
import '../LoginRegister.css';
import logo from '../../image/versto.png'

interface RegisterInterface {
  fullName: string;
  username: string;
  password: string;
}

const initialValues: RegisterInterface = {
  fullName: '',
  username: '',
  password: '',
};

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required('Please insert your fullname')
    .matches(/^[a-zA-Z\s]+$/, 'Fullname can only contain letters and spaces')
    .test('hasNoNumbersOrSpecialChars', 'Fullname cannot contain numbers or special characters', function (value) {
      return !/[0-9~!@#$%^&*()_+={}[\]:;<>,.?\\/-]/.test(value);
    }),
  username: yup
    .string()
    .required('Please insert your username')
    .matches(/^[a-z0-9]+$/, 'Username can only contain lowercase letters and numbers')
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username cannot be longer than 30 characters')
    .test('isLowercase', 'Username must be in lowercase', function (value) {
      return value === value.toLowerCase();
    }),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{6,}$/,
      'Password must have minimum 6 characters, at least 1 uppercase letter, and 1 numeric digit'
    ),
});


const Register: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigate = useNavigate();
  const handleSubmit = async (values: RegisterInterface) => {

    const body = {
      fullname: values.fullName,
      username: values.username,
      password: values.password,
    };

    try {
      const response = await fetch(`${API}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Error while register');
      }

      const data = await response.json();
      console.log('Success register:', data);
      Swal.fire("Register Success!");
      navigate('/')
    } catch (error) {
      console.error(error);
      Swal.fire("Register Failed!");
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
            Create New Account
          </Typography>

          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('fullName')}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

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
            style={{ marginTop: '16px', borderRadius: '24px', backgroundColor: '#b71c1c' }}
          >
            Register
          </Button>

          <Typography style={{ textAlign: 'center', padding: '20px' }}>
            Already Registered?
            <a onClick={() => navigate('/')}>
              <strong className="auth-text"> Login</strong>
            </a>
          </Typography>
        </Card>
      </Box>
    </form>
  );
};

export default Register;
