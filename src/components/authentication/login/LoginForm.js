import * as Yup from 'yup';
import { useEffect, useState } from 'react';
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
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleLogin from 'react-google-login';


// ----------------------------------------------------------------------

export default function LoginForm({ history }) {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [email1, setEmail1] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [reload, setreload] = useState(false)

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
        "email": email1


      });

      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/auth/forgotpassword',
        headers: {
          'Content-Type': 'application/json',

        },
        data: data2
      };
      console.log(config2)
      axios(config2)
        .then(function (response1) {
          localStorage.setItem("resetcode", response1.data.data)
          localStorage.setItem("emailReset", email1)
          // window.location.replace(false)
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

    if ( email == '' || password == ''){
     alert( "please provide an email and a password")
    }else{

    try {
      //http://localhost:5000/admin/login
      var admindata = JSON.stringify({
        "email": email,
        "password": password
      });
      var configadmin = {
        method: 'post',
        url: 'http://localhost:5000/admin/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: admindata
      };
      axios(configadmin)
        .then(function (response1) {
          console.log(response1.data.data.role)
          sessionStorage.setItem("role", response1.data.data.role);
          sessionStorage.setItem("firstname", response1.data.data.fullname);
          sessionStorage.setItem("lastname", response1.data.data.fullname);
        

          navigate('/dashboard/welcomeadmin', { replace: true });
          window.location.reload(false)

        })
        .catch(function (error) {
          console.log(error);
        });

      var data = JSON.stringify({
        "email": email,
        "password": password
      });
      var config = {
        method: 'post',
        url: 'http://localhost:5000/api/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios(config)
        .then(function (response) {
          localStorage.setItem("authToken", response.data.token);
          try {
            var config1 = {
              method: 'get',
              url: 'http://localhost:5000/api/',
              headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + response.data.token
              },
            };
            axios(config1)
              .then(function (response) {
                console.log(response.data.message);
                localStorage.setItem("idUser", response.data.message);
                try {
                  var data2 = JSON.stringify({
                    "id": response.data.message,

                  });
                  var config2 = {
                    method: 'post',
                    url: 'http://localhost:5000/api/auth/findbyid',
                    headers: {
                      'Content-Type': 'application/json',

                    },
                    data: data2
                  };
                  axios(config2)
                    .then(function (response1) {
                      console.log(response1.data.data)
                      try {
                        var data = {
                          "token": sessionStorage.getItem("tokenfirebase"),
                          "class":"SIM"
                          // "class":sessionStorage.getItem("className").toString()
                        }
                        // console.log("token i app",getToken())
                        var config2 = {
                          method: 'post',
                          url: 'http://localhost:5000/api/fcm/sub',
                          headers: {
                            'Content-Type': 'application/json',
                    
                          },
                          data: data
                    
                    
                        };
                         axios(config2)
                          .then(function (response1) {
                                console.log("signed to"+sessionStorage.getItem("className"))
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                        //console.log(data);
                      } catch (error) {
                        console.log("failure")
                      }
                      sessionStorage.setItem("email", response1.data.data.email);
                      sessionStorage.setItem("role", response1.data.data.role);
                      sessionStorage.setItem("firstname", response1.data.data.firstname);
                      sessionStorage.setItem("lastname", response1.data.data.lastname);
                      sessionStorage.setItem("id", response1.data.data._id);
                      sessionStorage.setItem("phone", response1.data.data.phone);
                      sessionStorage.setItem("image", response1.data.data.image);
                      sessionStorage.setItem("className", response1.data.data.claaseName);
                      if (response1.data.data.role == "admin") {

                      } try {
                        var data = {
                          "id": response1.data.data._id
                        }
                        var config2 = {
                          method: 'post',
                          url: 'http://localhost:5000/api/auth/isonline',
                          headers: {
                            'Content-Type': 'application/json',
                            
                          },
                          data: data
                  
                        };
                        axios(config2)
                          .then(function (response1) {
                  
                         
                            //is online 
                            //
                           navigate('/dashboard/app', { replace: true });
                           window.location.reload(false)
                            // console.log("users",re)
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
  }
};
  const handleFailure = (result) => {
    alert(result);
  };
  const handleLogin = async (googleData) => {
    console.log(googleData)
    sessionStorage.set
    try {
      var data = {
        "email": googleData.profileObj.email
      }
      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/auth/verifGoogle',
        headers: {
          'Content-Type': 'application/json',

        },
        data: data

      };
      axios(config2)
        .then(function (response1) {
          console.log(response1.data)
          if (response1.data.success == false){
            
           
            sessionStorage.setItem("firstname", googleData.profileObj.givenName)
            sessionStorage.setItem("lastname", googleData.profileObj.familyName)
            sessionStorage.setItem("email", googleData.profileObj.email)
            sessionStorage.setItem("image",googleData.profileObj.imageUrl)
            
            navigate('/loginGoogle', { replace: true });
          }
          else{
            
              try {
                var data = {
                  "email": googleData.profileObj.email
                }
                var config2 = {
                  method: 'post',
                  url: 'http://localhost:5000/api/auth/findbyemail',
                  headers: {
                    'Content-Type': 'application/json',
                    
                  },
                  data: data
          
                };
                axios(config2)
                  .then(function (response1) {
          
                    sessionStorage.setItem("firstname", response1.data.data.firstname)
                    sessionStorage.setItem("lastname", response1.data.data.lastname)
                    sessionStorage.setItem("email",response1.data.data.email)
                    sessionStorage.setItem("image",response1.data.data.image)
                    sessionStorage.setItem("role",response1.data.data.role)
                    sessionStorage.setItem("phone",response1.data.data.phone)
                    sessionStorage.setItem("id",response1.data.data._id)
                    //is online 
                    navigate('/dashboard/app', { replace: true });
                    //
                   
                    // console.log("users",re)
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
          
          
          
                //console.log(data);
              } catch (error) {
                console.log("failure")
              }
            
            
          }
         
         
          // console.log("users",re)
        })
        .catch(function (error) {
          console.log(error);
        });



      //console.log(data);
    } catch (error) {
      console.log("failure")
    }
    
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };


  return (
    <FormikProvider value={formik}>
      <Form onSubmit={loginHandler}>

        <Stack spacing={3}>
       
          <TextField
            fullWidth

            type="email"
            label="Email address"
            {...getFieldProps('email')}
            
            
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setEmail1(e.target.value)}
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
      <Stack spacing={3}>
        <p>   </p>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        ></GoogleLogin>
      </Stack>

    </FormikProvider>
  );
}
