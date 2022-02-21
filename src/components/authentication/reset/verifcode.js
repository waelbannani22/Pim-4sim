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

export default function VerifCode({history}) {
  const navigate = useNavigate();
  
   
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
 

 
  const LoginSchema = Yup.object().shape({
    code: Yup.string().required(),
   
  });

  const formik = useFormik({
    initialValues: {
      code: '',
     
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/confirmpassword', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

 
  const sendmail = async (e) => {
      
    var codelocal= localStorage.getItem("resetcode");
    console.log(codelocal,"   _____",code)
      if  (codelocal !== code) {
          alert("please fill a correct verification code!!")
      }else{
          
      
    e.preventDefault();
    navigate('/confirmpassword', { replace: true });

    
    
      }

  }


  return (
    <FormikProvider value={formik}>
      <Form  onSubmit={sendmail}>
        <Stack spacing={5}>
          <TextField
            fullWidth
            
            type="text"
            label="code"
            id="code"
            value={code}
            onChange={(e)=> setCode(e.target.value)}
            tabIndex={1}
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
