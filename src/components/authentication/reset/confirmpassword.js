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
  Button,
  Box
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// ----------------------------------------------------------------------

export default function Confirmpassword({history}) {
  const navigate = useNavigate();
  
   
  const [confirmpassword, setconfirm] = useState('');
  const [password, setPassword] = useState('');
 

 
  const LoginSchema = Yup.object().shape({
    password: Yup.string().required(),
   
  });

  const formik = useFormik({
    initialValues: {
        password: '',
        confirmpassword:''
     
    },
    validationSchema: LoginSchema,
    
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

 
  const confirm = async (e) => {
      
    
    
      if  (password !== confirmpassword || !password) {
          alert("both passwords should matches!!")
      }else{
          
      
    e.preventDefault();
    try {
        var data2 = JSON.stringify({
          "email":localStorage.getItem("emailReset"),
          "password":password
         
        });
        var config2 = {
          method: 'post',
          url:'http://localhost:5000/api/auth/resetpassword',
          headers: { 
            'Content-Type': 'application/json',
            
          },
          data:data2
        };
        axios(config2)
        .then(function  (response1) {
          console.log(response1.data.data)
          
           localStorage.clear()
          navigate('/login', { replace: true });
        })
        .catch(function (error) {
          console.log(error);
        });
        
        
        
          //console.log(data);
      } catch (error) {
        console.log("failure")
      }
    
    
      }

  }


  return (
    <FormikProvider value={formik}>
      <Form  onSubmit={confirm}>
        <Stack spacing={5}>
          <TextField
            fullWidth
            
            type="password"
            label="password"
            id="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            tabIndex={1}
          />
          
          <TextField
            fullWidth
            
            type="password"
            label="confirm-password"
            id="confirm-password"
            value={confirmpassword}
            onChange={(e)=> setconfirm(e.target.value)}
            tabIndex={2}
          />
          
        
        </Stack>
        <Box sx={{ m: 5 }} />
      
        
        
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          confirm
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
