import React, { useState ,useRef} from 'react';
import axios from "axios";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import {
  Box,
  
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Stack,
  Container,
  Input,
  Avatar,
  
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import defaultImage from "src/assets/img/imgplac.png";
import defaultAvatar from "src/assets/img/imgplac.png";


export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    firstName: sessionStorage.getItem("firstname"),
    lastName: sessionStorage.getItem("lastname"),
    email: sessionStorage.getItem("email"),
    phone: sessionStorage.getItem("phone"),
   


  });
  const [image, setImage] = React.useState(sessionStorage.getItem("image"));
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] =React.useState(
    image == null ? defaultAvatar : "http://localhost:5000/" + image
  );
  /*
  if ( image == null){
    setImagePreviewUrl(defaultAvatar)
  }else{
    var profilePic = "http://localhost:5000/" + image;
    setImagePreviewUrl(profilePic)
  }
  */
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
  
  
  const [password, setPassword] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const editHandler = async (e) => {
    e.preventDefault();
console.log(file)
    try {
      var data2 = JSON.stringify({
        "id": sessionStorage.getItem("id"),
        "firstname": values.firstName,
        "lastname": values.lastName,
        "phone": values.phone,
        "password": password,
        

      });
      const formData = new FormData()
      formData.append('image', file[0])
      formData.append('id', sessionStorage.getItem("id"))
      formData.append('firstname', values.firstName)
      formData.append('lastname', values.lastName)
      formData.append('phone',values.phone)
        formData.append('password',values.password)
        
        console.log(formData['image'])
      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/auth/updateUser',
        headers: { 
          'Content-Type': '*/*',
          
        },
        data: formData
      };
      console.log(config2)
      axios(config2)
        .then(function (response1) {
          console.log(response1.data.data)

          sessionStorage.setItem("email", response1.data.data.email);
          sessionStorage.setItem("role", response1.data.data.role);
          sessionStorage.setItem("firstname", response1.data.data.firstname);
          sessionStorage.setItem("lastname", response1.data.data.lastname);
          sessionStorage.setItem("phone", response1.data.data.phone);


        //  window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });



      //console.log(data);
    } catch (error) {
      console.log("failure")
    }



  }

  return (
    <form


      {...props}

    >
      <Container>
        <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
          
          
       
          
            <Input    type="file"  onChange={handleImageChange} ref={fileInput}/>
            <div className={"thumbnail" + (props.avatar ? " img-circle" : "")}>
              <Avatar src={imagePreviewUrl} alt="imageProfile"sx={{ width: 200, height: 200 }} />
             
            </div>
            <div>
        {file === null ? (
          <Button
            className="btn-round"
            color="default"
            outline
            onClick={handleClick}
          >
            {props.avatar ? "Add Photo" : "Select image"}
          </Button>
        ) : (
          <span>
          
            <Button
              color="danger"
              className="btn-round btn-link"
              onClick={handleRemove}
            >
              <i className="fa fa-times" />
              Remove
            </Button>
          </span>
        )}
      </div>
             
          
        </Stack>

      </Container>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                disabled={true}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>


          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >




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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleModal}>Cancel</Button>
                <Button onClick={editHandler}>confirm</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            onClick={toggleModal}
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
AccountProfileDetails.propTypes = {
  avatar: PropTypes.bool,
};
