import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';

import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { TextField, Input } from '@mui/material';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
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

import Notifications from 'src/components/notificationss';
import ReactNotificationComponent from 'src/components/Reactnotifications';
import { onMessageListener } from '../firebaseInit';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const style2 = {
  overflow: 'scroll'
};
function Display() {
  return (
    <div>
      <h4>notification created</h4>
      <p>a notification will be send to your students</p>
    </div>
  );
}


export default function ChapterModal() {
  const [filename, setFileName] = React.useState(null);
  var allid = []

  const add = async () => {
    try {
      var data = {
        "idClasse": JSON.parse(JSON.parse(sessionStorage.getItem("class")).class).id
      }

      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/admin/fetchStudentsInX',
        headers: {
          'Content-Type': 'application/json',

        },
        data: data


      };
      await axios(config2)
        .then(function (response1) {
          var i = 1;

          var result = response1.data.data

          result.map((e) => {

            allid.push(e._id)
            // console.log("allid",allid)
            

          });
          //console.log(userss)
          sessionStorage.setItem("listid", JSON.stringify(allid))
        })
        .catch(function (error) {
          console.log(error);
        });
      //console.log(data);
    } catch (error) {
      console.log("failure")
    }
  }

  useEffect(() => {
    add()

  }, [])

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
    setselected(selectedFile)
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {

        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        setFileName(selectedFile.name)

        localStorage.setItem("pdfname", selectedFile.name)
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError('');
        }
      }
      else {
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else {
      console.log('select your file');
    }
  }

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    }
    else {
      setViewPdf(null);
    }
  }

  const [file, setFile] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [notification, setNotification] = useState({ title: "test", body: "test" });
  const [show, setShow] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const RegisterSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: { name: '', description: '' },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const addChapterHandler = async (e) => {

    try {
      const formData = new FormData()
      formData.append('pdfname', selected)
      formData.append('name', name)

      formData.append('description', description)

      formData.append('course', JSON.parse(sessionStorage.getItem("class"))._id)


      var data2 = JSON.stringify({
        course: '6224ca73caf9570b7c3b8243',
        name: name,
        description: description,
        pdfname: selected
      });
      console.log(data2);
      var config2 = {
        method: 'post',
        url: 'http://localhost:5000/api/resource/add',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      };
      console.log(config2);
      axios(config2)
        .then(function (response1) {
          console.log('ssucess added');

          // navigate('/dashboard/app', { replace: false });
          //window.location.reload();

          // onMessageListener()
          // .then((payload) => {
          //   console.log("payload",payload)

          //   setNotification({
          //     title: payload.notification.title,
          //     body: payload.notification.body,
          //   });
          // })
          // .catch((err) => console.log("failed: ", err));

          // create notification
          var u =JSON.parse(sessionStorage.getItem("class")).title
          var i = JSON.parse(sessionStorage.getItem("class")).description
          var lisst =JSON.stringify(sessionStorage.getItem("listid"))
          console.log(sessionStorage.getItem("listid"))
          var listnew = []
          var today = new Date(),

          date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
         // lisst.map((e)=>listnew.push(e))
          var data3 = ({
            title:  u,
            description: "new cahpter has been added",
            type: "mail",
            users: JSON.parse(sessionStorage.getItem("listid")),
            
            motif : "new champter added to "
          });
          console.log(data3);
          var config2 = {
            method: 'post',
            url: 'http://localhost:5000/api/notifications/createnotification',
            headers: {
              'Content-Type': 'application/json',
            },
            data: data3
          };
          axios(config2)
            .then(function (response1) {
              console.log(data3)
              toast.info(<Display />);
              
              
            }).catch(function (error) {
              console.log(error);
            });

          //
          setIsOpen(false)

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
        Add new chapter
      </Button>
      {/* <ReactNotificationComponent/> */}

      {/* <Notifications/> */}

      <div>
        <Dialog open={isOpen} onClose={toggleModal}>
          <DialogTitle>Add new chapter</DialogTitle>
          <DialogContent>
            <DialogContentText>Please insert your title</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
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
            <div className='container'>

              <br></br>

              <form className='form-group' onSubmit={handlePdfFileSubmit}>
                <Input type="file" className='form-control'
                  required onChange={handlePdfFileChange}
                />
                {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
                <br></br>

                <br></br>

              </form>

              <br></br>
              <div className='pdf-container'>
                {/* show pdf conditionally (if we have one)  */}
                {viewPdf && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                  <Viewer fileUrl={viewPdf}
                    plugins={[defaultLayoutPluginInstance]} />
                </Worker></>}

                {/* if we dont have pdf or viewPdf state is null */}
              </div>

            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={toggleModal}>Cancel</Button>
            <Button
              onClick={() => {

                addChapterHandler();

              }}
            >send</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
