import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';

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



export default function HomeWork() {
  const [file, setFile] = useState(null);
  
  const [exercice, setExercice] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');



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
    initialValues: { exercice: '', description: '',date:'' },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const addChapterHandler = async (e) => {
    e.preventDefault();

    try {
      var data2 = JSON.stringify({
        course: '6224ca73caf9570b7c3b8243',
        exercice: exercice,
        description: description,
        date: date,
        pdfexercicename: localStorage.getItem('pdfexercicename')
      });
      console.log(data2);
      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/work/add',
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
    <div align="end">
      <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={toggleModal}>
        Add homework
      </Button>

      <div>
        <Dialog open={isOpen} onClose={toggleModal}>
          <DialogTitle>Add homework</DialogTitle>
          <DialogContent>
            <DialogContentText>Please insert your exercice</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="exercice"
              label="exercice"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setExercice(e.target.value)}
            />
            <DialogContentText>Please insert your description</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="description"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
            />
            <DialogContentText>Please insert your file</DialogContentText>
            <PdfUpload />
         
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleModal}>Cancel</Button>
            <Button onClick={addChapterHandler}>send</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
