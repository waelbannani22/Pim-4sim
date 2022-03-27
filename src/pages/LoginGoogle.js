import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import teacher from '../assets/img/convocatoria-bolsa-docente-maestros-infantil-y-primaria-2.jpg'
import student from '../assets/img/our-students.jpg'
import {  useNavigate } from 'react-router-dom';
import { height, width } from '@mui/system';
import axios from "axios";
const images = [
  {
    url: teacher,
    title: 'Teacher',
    width: '50%',
    direction : 'user'
  },
  {
    url: student,
    title: 'Student',
    width: '50%',
    direction:'Student'
  },
  
];


const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function LoginGoogle() {
  const navigate = useNavigate();
  const handleLogin = async (rol) => {
    
    try {
      var data = {
         "email": sessionStorage.getItem("email"),
         "firstname": sessionStorage.getItem("firstname"),
         "lastname" :sessionStorage.getItem("lastname"),
         "role": rol,
         
         "image":sessionStorage.getItem("image")
      }
      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/auth/registerGoogle',
        headers: {
          'Content-Type': 'application/json',
  
        },
        data: data
        
      };
      axios(config2)
        .then(function (response1) {
          sessionStorage.setItem("id",response1.data.data._id)
          sessionStorage.setItem("role",response1.data.data.role)
          navigate('/dashboard', { replace: false });
          
          window.location.reload(false)
           //alert("response1.data.data")
          // window.location.reload()
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
    
    const [role, setRole] = useState('');
  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', minWidth: 500, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
        //  onChange={(e)=>setRole(image.title)}
          onClick={()=>handleLogin(image.title)}
          focusRipple
          key={image.title}
          style={{
            width: image.width,
            height: 500
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image >
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}
