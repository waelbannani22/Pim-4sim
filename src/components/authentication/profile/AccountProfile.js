import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import Modal from "react-modal";
import React, { useState } from 'react';
import ImageUpload from 'src/utils/imageUploader';
import formdialog from 'src/components/authentication/profile/confirmpassword'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import defaultImage from "src/assets/img/imgplac.png";
import defaultAvatar from "src/assets/img/imgplac.png";




export const AccountProfile = (props) => {





  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  
  const [info, setInfo] = useState([]);
  
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: '',
  });



  //confirm
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  //new 
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    props.avatar ? defaultAvatar : defaultImage
  );
  const fileInput = React.useRef(null);
  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setFile(file);

        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo({
      image: '',
      name: '',
    });
    setProgressPercent(0);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setProgressPercent(percent);
      },
    };
    axios
      .post('http://localhost:5000/api/images/category', formData, options)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setInfo(res.data.category);
          setProgressPercent(0);
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response);
        setError({
          found: true,
          message: err.response.data.errors,
        });
        setTimeout(() => {
          setError({
            found: false,
            message: '',
          });
          setProgressPercent(0);
        }, 3000);
      });

  };



  return (
    <Card {...props}>

      <CardContent>

        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >



          <ImageUpload/>
          <div>

            <Dialog open={isOpen} onClose={toggleModal} >
              <DialogTitle>confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please insert your password to confirm your changes
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="password"
                  type="password"
                  fullWidth
                  hidden={true}
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleModal}>Cancel</Button>
                <Button onClick={handleSubmit}>Subscribe</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>

      </CardContent>
      <Divider />
      <CardActions>
        <Button
          onClick={toggleModal}
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
