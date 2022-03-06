import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import axios from "axios";
import { PdfUpload } from '../pages';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';






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

export default function ChapterModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const RegisterSchema = Yup.object().shape({
  
  });

  const formik = useFormik({
    initialValues: {name: '',
    description: ''},
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
        "id": sessionStorage.getItem("id"),
        "firstname": values.firstName,
        "lastname": values.lastName,
        "phone": values.phone,
        "password": password,
        

      });
   
      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/cour/add',
        headers: { 
          'Content-Type': '/',
          
        },
        data: formData
      };
      console.log(config2)
      axios(config2)
        .then(function (response1) {
          console.log("ssucess added")

         

          navigate('/dashboard/app', { replace: false });
          //window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });



      //console.log(data);
    } catch (error) {
      console.log("failure")
    }
  };

  return (
    <div align="end">
      <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleOpen}>
        Add new chapter
      </Button>
      <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={(e)=>addChapterHandler}>
      <Modal
        sx={style2}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              fullWidth
              label="chapter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <PdfUpload />
            <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onSubmit={addChapterHandler}
          >
            Add
          </LoadingButton>
          </Box>
        </Fade>
      </Modal>
      </Form>
    </FormikProvider>
    </div>
  );
}
