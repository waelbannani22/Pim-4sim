import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";

import PropTypes from "prop-types";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
//pdf
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; //

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Box,
Button,
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
    Typography,

} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import defaultImage from "src/assets/img/imgplac.png";
import defaultAvatar from "src/assets/img/imgplac.png";
import { isUndefined } from 'lodash';


export const StudentRendu = (props) => {
    const [values, setValues] = useState({
        firstName: sessionStorage.getItem("firstname"),
        lastName: sessionStorage.getItem("lastname"),
        email: sessionStorage.getItem("email"),
        phone: sessionStorage.getItem("phone"),



    });
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [expanded, setExpanded] = React.useState(false);

    const handleChangee = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const navigate = useNavigate();
    const [image, setImage] = React.useState(sessionStorage.getItem("image"));
    const [file, setFile] = React.useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState('')
    const [HomeWorks, setHomeworks] = useState([]);
    const fetchHomeworkTeacher = () => {
        try {
            var data2 = JSON.stringify({
                "idstudent": JSON.parse(sessionStorage.getItem("studentselected"))._id,
                "idhomework": sessionStorage.getItem("idcourse")
            });

            var config2 = {
                method: 'post',
                url: 'http://localhost:5000/api/work/findbysh',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data2
            };
            console.log(config2);
            axios(config2)
                .then(function (response1) {
                    console.log('ssucess added');
                    setHomeworks(response1.data.data);
                    console.log(response1.data.data);
                    //  navigate('/dashboard/homeworklist', { replace: true });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.log('failure');
        }
    };
    const fetchHomework = () => {
        try {
            var data2 = JSON.stringify({
                "idstudent": sessionStorage.getItem("id"),
                "idhomework": sessionStorage.getItem("idcourse")
            });

            var config2 = {
                method: 'post',
                url: 'http://localhost:5000/api/work/findbysh',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data2
            };
            console.log(config2);
            axios(config2)
                .then(function (response1) {
                    console.log('ssucess added');
                    setHomeworks(response1.data.data);
                    console.log(response1.data.data);
                    //  navigate('/dashboard/homeworklist', { replace: true });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.log('failure');
        }
    };
    useEffect(() => {
        
        if (sessionStorage.getItem("role") == "teacher") {
            fetchHomeworkTeacher()
            if (isUndefined(JSON.parse(sessionStorage.getItem("studentselected")).image)) {
                setImagePreviewUrl("http://localhost:5000/uploads/avatarw.png")


            } else {
                setImagePreviewUrl("http://localhost:5000/" + JSON.parse(sessionStorage.getItem("studentselected")).image)



            }
        } else {
            fetchHomework()
            setImagePreviewUrl("http://localhost:5000/" + sessionStorage.getItem("image"))
        }

    }, [])


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


    const editHandler = async (e) => {
        e.preventDefault();

        try {
            var data2 = JSON.stringify({
                "id": sessionStorage.getItem("id"),
                "firstname": values.firstName,
                "lastname": values.lastName,
                "phone": values.phone,
                "password": password,


            });
            const formData = new FormData()
            formData.append('image', file)
            formData.append('id', sessionStorage.getItem("id"))
            formData.append('firstname', values.firstName)
            formData.append('lastname', values.lastName)
            formData.append('phone', values.phone)
            formData.append('password', password)


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
                    sessionStorage.setItem("image", response1.data.data.image);


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
    const editHandler1 = async (e) => {
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
                url: 'http://localhost:5000/api/auth/updateUser1',
                headers: {
                    'Content-Type': 'application/json'

                },
                data: data2
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
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));
    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));
    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    return (
        <form


            {...props}

        >
            <Container>
                <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>





                    <div className={"thumbnail" + (props.avatar ? " img-circle" : "")}>
                        <Avatar src={imagePreviewUrl} alt="imageProfile" sx={{ width: 200, height: 200 }} />

                    </div>
                    <div>
                        {file !== null ? (
                            <Button
                                className="btn-round"
                                color="default"
                                outline
                                onClick={handleClick}
                            >
                                {props.avatar ? "Add Photo" : "Select image"}
                            </Button>
                        ) : (

                            null
                        )}
                    </div>
                    {sessionStorage.getItem("role") == "teacher" ? (
                        <Typography color="green">{JSON.parse(sessionStorage.getItem("studentselected")).firstname + " " + JSON.parse(sessionStorage.getItem("studentselected")).lastname}</Typography>

                    ) : (
                        <Typography color="green">{sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname")}</Typography>

                    )}
                    <Divider />

                    <div>
                        {HomeWorks.length == 0 ? (
                            <Accordion sx={{ width: '90%', flexShrink: 0 }} expanded={expanded === '2'} onChange={handleChangee('2')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '50%', flexShrink: 0 }}>
                                        no homework
                                    </Typography>

                                </AccordionSummary>

                            </Accordion>
                        ) :
                            HomeWorks.map((r) => (
                                <Accordion sx={{ width: '100%', flexShrink: 0 }} expanded={expanded === r._id} onChange={handleChangee(r._id)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        sx={{ width: '100%', flexShrink: 0 }}
                                    >
                                        <Typography sx={{ width: '40%', flexShrink: 0 }}>
                                            {r.exercice}
                                        </Typography>
                                        <Typography align='center' sx={{ color: 'green', flexShrink: 0  }}>delivred</Typography>
                                        {sessionStorage.getItem("id")==r.idstudent?(
                                             <Button  align='right' sx={{  flexShrink: 0 }} onClick={(e) => null} variant="outlined" color="error">
                                            Delete
                                        </Button>
                                        ):(
                                            null
                                        )}
                                       
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                                                <Viewer

                                                    fileUrl={'http://localhost:5000/' + r.rendu}
                                                    plugins={[defaultLayoutPluginInstance]}
                                                />
                                            </Worker>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            ))}





                    </div>

                </Stack>

            </Container>

        </form>
    );
};

