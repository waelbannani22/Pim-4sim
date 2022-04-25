import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { Stack, label, Input,  IconButton, InputAdornment, Container,Avatar} from '@mui/material';

import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import axios from 'axios';
import { PdfUpload } from '../pages';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FileUploader } from "react-drag-drop-files";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const style2 = {
  overflow: 'scroll'
};



export default function AddCommentModal() {
  
  const [commantaire, setCommantaire] = useState('');
  

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const RegisterSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: { commantaire: '' },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const addChapterHandler = async (e) => {
    e.preventDefault();
    var today = new Date(),

    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    try {
      var data2 = JSON.stringify({
     //   course: '6224ca73caf9570b7c3b8243',
        commantaire: commantaire,
        created : date,
        user : sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname"),
        lesson : JSON.parse(sessionStorage.getItem("class"))._id
      });
      console.log(data2);
      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/commantaire/add',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data2
      };
      console.log(config2);
      axios(config2)
        .then(function (response1) {
          console.log('ssucess added');

          // navigate('/dashboard/app', { replace: false });
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });

      //console.log(data);
    } catch (error) {
      console.log('failure');
    }
  };
  
   


  return (
    <div align="end" >
      <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={toggleModal}>
        Add new comment
      </Button>

      <div>
      <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>

        <Dialog open={isOpen} onClose={toggleModal}>
          <DialogTitle>Add new chapter</DialogTitle>
          <DialogContent>
            <DialogContentText>Please insert your comment</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              label="comment"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setCommantaire(e.target.value)}
            />
          
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleModal}>Cancel</Button>
            <Button onClick={addChapterHandler}>send</Button>
          </DialogActions>
        </Dialog>
        </Stack>
      </div>
    </div>
  );
}
