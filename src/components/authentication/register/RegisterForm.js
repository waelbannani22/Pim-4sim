import * as Yup from 'yup';
import { useState } from 'react';
import axios from "axios";
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate, Link as RouterLink, } from 'react-router-dom';

// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm({history}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  //localStorage.setItem("authToken", "");
  const RegisterSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, 'Too Short!')
      ,
      lastname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  
  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    console.log(firstname,lastname,email,password);
   /* if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }
    */

    try {
      
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        { firstname,lastname,email, password },
        config
      );
      console.log(JSON.stringify("success",data))
      localStorage.setItem("authToken", data.token);
      navigate('/dashboard', { replace: true });
      history.push("/");
    } catch (error) {
      console.log(JSON.stringify("failure",error))
      //setError(error.response.success);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={registerHandler}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
            
              type="text"
             
              id="firstname"
              value={firstname}
              onChange={(e)=> setFirstName(e.target.value)}
              tabIndex={1}
             
            />

            <TextField
              fullWidth
              label="Last name"
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e)=> setLastName(e.target.value)}
              tabIndex={2}
              
            
            />
          </Stack>

          <TextField
            fullWidth
           
            type="text"
            label="Email address"
            id="email"
            value={email}
            
            onChange={(e)=> setEmail(e.target.value)}
            tabIndex={3}
           
           // helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
           
            id="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            tabIndex={4}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          
          />
          
          

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
