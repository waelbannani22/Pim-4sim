
import React,{useState} from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "PDF"];


export const PdfUpload = () => {
  const [filename, setFileName] = React.useState(null);
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
const  upload=()=>
{
  try {
     
    const formData = new FormData()
    console.log(pdfFile)
    formData.append('photo', selected)

    var config2 = {
      method: 'post',
      url: 'http://localhost:5000/upload',
      headers: { 
        'Content-Type': '/',
        
      },
      data: formData
    };
    console.log(config2)
    axios(config2)
      .then(function (response1) {
        console.log("ssucess added")

       

       // navigate('/dashboard/app', { replace: false });
        //window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });



    console.log(data);
  } catch (error) {
    console.log("failure")
  }



}
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(null);
  const [selected, setselected]=useState(null);

  // onchange event
  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    setselected(selectedFile)
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
       
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            setFileName(selectedFile.name)

            localStorage.setItem("pdfname",selectedFile.name)
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setPdfFileError('');
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
  }

  // form submit
  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
      setViewPdf(pdfFile);
    }
    else{
      setViewPdf(null);
    }
  }

  return (
    <div className='container'>

    <br></br>

      <form className='form-group' onSubmit={handlePdfFileSubmit}>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange}
        />
        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
        <br></br>
        <button  className='btn btn-success btn-lg'>
          UPLOAD
        </button>
        <br></br>
      
      </form>
      <button  className='btn btn-success btn-lg' onClick={(e)=>upload()}>
          upload to ressource
        </button>
      <br></br>
      <h4>View PDF</h4>
      <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf&&<>No pdf file selected</>}
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      </div>

    </div>
  )
}

export default PdfUpload