import * as Yup from 'yup';
import { useState } from 'react';
import axios from "axios";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// ----------------------------------------------------------------------

export default function LoginForm({history}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
   
  const [email, setEmail] = useState('');
  const [email1, setEmail1] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const sendmail = async (e) => {
    e.preventDefault();
    
    try {
      var data2 = JSON.stringify({
        "email":email1
        
       
      });
     
      var config2 = {
        method: 'post',
        url:'http://localhost:5000/api/auth/forgotpassword',
        headers: { 
          'Content-Type': 'application/json',
          
        },
        data:data2
      };
      console.log(config2)
      axios(config2)
      .then(function  (response1) {
        localStorage.setItem("resetcode",response1.data.data)
        localStorage.setItem("emailReset",email1)
        window.location.replace(false)
        navigate('/resetpassword', { replace: false });
      })
      .catch(function (error) {
        console.log(error);
        alert("no user found , please check the email")
      });
   
        //console.log(data);
    } catch (error) {
      console.log("failure")
    }
    


  }
  const loginHandler = async (e) => {
    e.preventDefault();

    

    try {
      var data = JSON.stringify({
        "email":email,
        "password":password
      });
      var config = {
        method: 'post',
        url:'http://localhost:5000/api/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
      .then(function (response) {
        localStorage.setItem("authToken", response.data.token);
        try {
          var config1 = {
            method: 'get',
            url:'http://localhost:5000/api/',
            headers: { 
              'Content-Type': 'application/json',
              'authorization' : 'Bearer '+ response.data.token
            },
          };
          axios(config1)
          .then(function (response) {
            console.log(response.data.message);
            localStorage.setItem("idUser", response.data.message);
            try {
              var data2 = JSON.stringify({
                "id":response.data.message,
               
              });
              var config2 = {
                method: 'post',
                url:'http://localhost:5000/api/auth/findbyid',
                headers: { 
                  'Content-Type': 'application/json',
                  
                },
                data:data2
              };
              axios(config2)
              .then(function  (response1) {
                console.log(response1.data.data)
                
                 sessionStorage.setItem("email", response1.data.data.email);
                 sessionStorage.setItem("role", response1.data.data.role);
                 sessionStorage.setItem("firstname", response1.data.data.firstname);
                 sessionStorage.setItem("lastname", response1.data.data.lastname);
                 sessionStorage.setItem("id", response1.data.data._id);
                 sessionStorage.setItem("phone", response1.data.data.phone);
                navigate('/dashboard', { replace: true });
              })
              .catch(function (error) {
                console.log(error);
              });
              
              
              
                //console.log(data);
            } catch (error) {
              console.log("failure")
            }
            
          })
          .catch(function (error) {
            console.log(error);
          });
          
          
          
            //console.log(data);
        } catch (error) {
          console.log("failure")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
        
      
      
      

      
     
      
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form  onSubmit={loginHandler}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            
            type="email"
            label="Email address"
            //{...getFieldProps('email')}
            //error={Boolean(touched.email && errors.email)}
            //helperText={touched.email && errors.email}
            id="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            tabIndex={1}
          />
          
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            id="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            tabIndex={2}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link onClick={toggleModal}>
            Forgot password?
          </Link>
        </Stack>
        <div>

            <Dialog open={isOpen} onClose={toggleModal} >
              <DialogTitle>reset</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please insert your email
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="email"
                  type="email"
                  fullWidth
                  
                  variant="standard"
                  onChange={(e)=> setEmail1(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleModal}>Cancel</Button>
                <Button onClick={sendmail}>send</Button>
              </DialogActions>
            </Dialog>
          </div>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
