import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';

import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Link as RouterLink } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import {
  TextField,
  Input,
  Container,
  Stack,
  Card,
  Typography,
  CardActionArea
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PdfUpload } from '../pages';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
//pdf
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
// import DateTimePicker from 'react-datetime-picker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { green } from '@mui/material/colors';

const style = {
  bgcolor: 'background.paper',
  border: '3px solid rgb(60, 179, 113)',
  boxShadow: 100
};
const style2 = {
  overflow: 'scroll'
};
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function HomeWork() {
  const [value, setValue] = React.useState(new Date());
  const [filename, setFileName] = useState(null);
  const [HomeWorks, setHomeworks] = useState([]);

  const fetchHomework = () => {
    try {
      var data2 = JSON.stringify({
        courseid: JSON.parse(sessionStorage.getItem('class'))._id
      });

      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/exercice/findbycourse',
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
    fetchHomework();
    localStorage.setItem('idmap', '');
  }, []);
  // Create new plugin instance
  //const defaultLayoutPluginInstance = defaultLayoutPlugin('');

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);
  const [selected, setselected] = useState(null);

  // onchange event
  const fileType = ['application/pdf'];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    setselected(selectedFile);
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        setFileName(selectedFile.name);

        localStorage.setItem('pdfexcercicename', selectedFile.name);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError('');
        };
      } else {
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    } else {
      console.log('select your file');
    }
  };

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };
  const deleterow = (id) => {
    try {
      var data2 = JSON.stringify({
        exerciceID: id
      });

      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/exercice/delete',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data2
      };
      console.log(config2);
      axios(config2)
        .then(function (response1) {
          console.log('ssucess delete');

          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log('failure');
    }
  };

  const [file, setFile] = useState(null);

  const [exercice, setExercice] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const [expanded, setExpanded] = React.useState(false);
  const [idselected, setid] = useState('');
  const handleExpandClick = (id) => {
    setExpanded(!expanded);
  };

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
    initialValues: { exercice: '', description: '' },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const addChapterHandler = async (e) => {
    try {
      const formData = new FormData();
      formData.append('pdfexercicename', selected);
      formData.append('exercice', exercice);
      var da =
        value.getFullYear() +
        '-' +
        (value.getMonth() + 1) +
        '-' +
        value.getDate() +
        ' ' +
        value.getHours() +
        ':' +
        value.getMinutes();
      formData.append('description', description);
      formData.append('date', da);

      formData.append('course', JSON.parse(sessionStorage.getItem('class'))._id);
      var data2 = JSON.stringify({
        course: '6224ca73caf9570b7c3b8243',
        exercice: exercice,
        description: description,
        pdfexcercicename: selected
      });
      // console.log(data2);
      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/exercice/add',
        headers: {
          'Content-Type': 'application/json'
        },
        data: formData
      };
      console.log(config2);
      axios(config2)
        .then(function (response1) {
          console.log('ssucess added');
          window.location.reload();

          setIsOpen(false);
        })
        .catch(function (error) {
          console.log(error);
        });

      //console.log(data);
    } catch (error) {
      console.log('failure');
    }
  };
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div align="center">
      <div align="end">
        {sessionStorage.getItem('role') == 'teacher' ? (
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={toggleModal}>
            Add HomeWork
          </Button>
        ) : null}
      </div>
      <div>
        <div>
          <Dialog open={isOpen} onClose={toggleModal}>
            <DialogTitle>Add HomeWork</DialogTitle>
            <DialogContent>
              <DialogContentText>Please insert your Date Limit</DialogContentText>
              <br />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  disableHighlightToday={false}
                  ampm={false}
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
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

              <form className="form-group" onSubmit={handlePdfFileSubmit}>
                <Input
                  type="file"
                  className="form-control"
                  required
                  onChange={handlePdfFileChange}
                />
                {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
              </form>
            </DialogContent>

            <DialogActions>
              <Button onClick={toggleModal}>Cancel</Button>
              <Button
                onClick={() => {
                  addChapterHandler();
                }}
              >
                send
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <Container>
        <br />
        {HomeWorks.map((r) => (
          <Card id={r._id} key={r._id} sx={{ maxWidth: 1000, my: 3 }} style={style}>
            <Stack direction="row" alignItems="center" justifyContent="space-around" mb={5}>
              <CardHeader title={r.exercice} />
              <div></div>
              <Typography color="green">{r.date}</Typography>
            </Stack>
            <CardActions key={r._id} disableSpacing>
              <div>
                {sessionStorage.getItem('role') == 'teacher' ? (
                  <Button onClick={(e) => deleterow(r._id)} variant="outlined" color="error">
                    Delete
                  </Button>
                ) : null}
              </div>
              <ExpandMore
                //expand={expanded}
                onClick={(e) => {
                  localStorage.setItem('idmap', r._id);
                  handleExpandClick(r._id);
                }}
                //aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={r._id == localStorage.getItem('idmap') ? true : false}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography paragraph>{r.description}</Typography>

                <div>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                    <Viewer
                      key={r._id}
                      fileUrl={'http://localhost:5000/' + r.pdfexcercicename}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </div>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Container>
    </div>
  );
}
