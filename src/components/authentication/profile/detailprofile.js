import { useState } from 'react';
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    firstName: sessionStorage.getItem("firstname"),
    lastName: sessionStorage.getItem("lastname"),
    email: sessionStorage.getItem("email"),
    phone: sessionStorage.getItem("phone"),
    

  });
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
    
    try {
      var data2 = JSON.stringify({
        "id":sessionStorage.getItem("id"),
        "firstname": values.firstName,
        "lastname":values.lastName,
        "phone":values.phone,
        "password":password,
       
      });
     
      var config2 = {
        method: 'post',
        url:'http://localhost:5000/api/auth/updateUser',
        headers: { 
          'Content-Type': 'application/json',
          
        },
        data:data2
      };
      console.log(config2)
      axios(config2)
      .then(function  (response1) {
        console.log(response1.data.data)
        
         sessionStorage.setItem("email", response1.data.data.email);
         sessionStorage.setItem("role", response1.data.data.role);
         sessionStorage.setItem("firstname", response1.data.data.firstname);
         sessionStorage.setItem("lastname", response1.data.data.lastname);
         sessionStorage.setItem("phone", response1.data.data.phone);


         window.location.reload();
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
                  onChange={(e)=> setPassword(e.target.value)}
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
