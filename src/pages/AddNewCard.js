import * as Yup from 'yup';
import React,{ useState ,useRef, useEffect} from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, label, Input,  IconButton, InputAdornment, Container,Avatar,Select,MenuItem,InputLabel,FormControl} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {ImageUpload} from '../pages';
import axios from "axios";
import defaultImage from "../assets/img/holder.png";
import defaultAvatar from "../assets/img/holder.png";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

export default function AddNewCard(props) {
  const [title, setTitle] = useState('');
  const [description, SetDescription] = useState('');
  const [classes, SetClasse]= useState([]);
  const [image, setImage] = useState(null);
  const [selected, setSelected]= useState([]);
  
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    props.avatar ? defaultAvatar : defaultImage
  );
  useEffect(()=>{
    getclasses()
  },[])
  const fileInput = React.useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
  const getclasses = () => {
    var data2 = JSON.stringify({
      "idTeacher": sessionStorage.getItem("id")
   });
    var config2 = {
      method: 'post',
      url: 'http://localhost:5000/admin/class/getclassesteacher',
      headers: { 
          'Content-Type': 'application/json',
        
      },
      data: data2
    };
    axios(config2)
  .then(function (response1) {
   
    
    SetClasse(response1.data.data)
    console.log(response1.data.data)
   
  })
  .catch(function (error) {
    console.log(error);
  });
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };
  const RegisterSchema = Yup.object().shape({
  
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const formik = useFormik({
    initialValues: {title: '',
    description: '',},
    validationSchema: RegisterSchema,
    
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const editHandler = async (e) => {
    e.preventDefault();
    //console.log(file[0])
    try {
     
      var today = new Date(),

      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const formData = new FormData()
      formData.append('idPhoto', file)
      formData.append('user', sessionStorage.getItem("id"))
      formData.append('title', title)
      formData.append('description', description)
      formData.append('created',date)
      formData.append('classes',JSON.stringify(selected))
      
   
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



  }
  const addHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      
      const { data } = await axios.post(
        "http://localhost:5000/api/cour/add",
        { title, description,idPhoto },
        config
      );

      navigate('/dashboard', { replace: true });
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form   onSubmit={editHandler}>
      
        <Stack direction="column" alignItems="center"  mb={5} spacing={3}>
          
          
       
          
            <Input    type="file"  onChange={handleImageChange} ref={fileInput}/>
            <div className={"thumbnail" + (props.avatar ? " img-circle" : "")}>
              <img src={imagePreviewUrl} alt="imageProfile" width= {200} height={200}  />
             
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

      
        <Stack spacing={3}>
          <TextField
            
            
            type="text"
            label="lesson name"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          />
          <TextField
            
            type="text"
            label="description"
            value={description}
            onChange={(e)=>SetDescription(e.target.value)}
          />
           <FormControl fullWidth>
           <InputLabel id="demo-simple-select-label">className</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
             
              label="className"
              
              onChange={(e) => setSelected(e.target.value)}
            >
              {classes.map((el)=>(<MenuItem  value={el}>{el.classeName}</MenuItem>))}
              

            </Select>
            </FormControl>
          
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
       
          >
            Add
          </LoadingButton>
         
        </Stack>
      </Form>
    </FormikProvider>
  );
}
AddNewCard.propTypes = {
  avatar: PropTypes.bool,
};
