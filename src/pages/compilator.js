
/**
 * function detectLang(snippet, options) { ... }
 *
 * @snippet {String} The code snippet.
 * @options {Object} (Optional) {
 *   heuristic: {Boolean} Enable heuristic optimisation for better performance. `true` by default.
 *   statistics: {Boolean} Return statistics. `false` by default.
 * }
 * @return {String} (Name of the detected language) or {Object} (Statistics).
 */
// var DownloadButton = require('downloadbutton')
var detectLang = require('lang-detector');
var axios = require('axios');
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

import Tree from "react-fs-treeview";
import './style.css';
import AceEditor from 'react-ace';
import React, {
  useState, Component, useRef, useCallback, useEffect, forwardRef,
  useImperativeHandle
} from 'react';
import useDrivePoicker from 'react-google-drive-picker';
import io from 'socket.io-client';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-pascal';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-searchbox';
import logo from '../logo.png';
import {
  Box,
  Grid,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import { findClosestEnabledDate } from '@mui/lab/internal/pickers/date-utils';
import { string } from 'prop-types';
import "./styles.css";
import { motion, AnimatePresence } from "framer-motion";
const socket = io('http://localhost:2001');
socket.on('connect', () => {
  console.log('you connected');
});

export default function Compilator() {


  let fileHandle;

  const [Mode, setMode] = useState('text');
  const [def, setDef] = useState('');
  const [dis, setDif] = useState('true');
  const [res, setRes] = useState('');


  const[name,setname]=useState('')
  const [file, setFile] = useState('');
  const [path, setPath] = useState('');
  const [read, setRead] = useState(false);
  const [col, setCol] = useState('uncol')
  const [sidebar, setSidebar] = useState('Collapse')
  useEffect(()=>{
    if ( sessionStorage.getItem("role") == "teacher"){
     
    var config = {
      method: 'get',
      url: 'http://localhost:5000/getna',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    axios(config)

      .then(function (response) {
        console.log(response.data.name);

setname(response.data.name)
      })
      .catch(function (error) {
        console.log(error);
      });

 
   setFile('C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/work/'+name) 
  }
  }
  )
  
  function payment() {
    setRead(true)
  }

  socket.on('receive-message', (message) => {
    setDef(message);
    setMode(detectLang(message))
  });
  const [openPicker, data, authResponse] = useDrivePoicker();
  const handleOpenPicker = () => {
    // if (dis == 'true') {
    //   alert('You need to save in order to upload to your drive !!');
    // } else {
    openPicker({
      clientId: '463331987291-kj9ih0vip16oc28es8iqeg92kcunq95g.apps.googleusercontent.com',
      developerKey: 'AIzaSyBdnWlT2JSPg-yegXtaXK1FDgfE1K0W3BQ',
      viewId: 'DOCS',
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true
    });
    //}
  };
  useEffect(() => {
    if (data) {
      data.docs.map((i) => console.log(i.name));
    }
  }, [data]);
  window.onbeforeunload = function (e) {
    e = e || window.event;

    if (e) {
      e.returnValue = 'Did you save your files ?';
    }


  };
  function onChange(newValue) {
    console.log('change', newValue);
    var message = newValue;
    socket.emit('send-message', message);
    setDef(message);
    var lang = detectLang(message);
    var lang2 = lang.toLowerCase();
    if (lang2 == 'unknown') {
      lang2 = 'text';
    }

    setMode(lang2);
    var x = message.split(/\r\n|\r|\n/).length;
    //if(x>5)
    //{
    //payment()
    //}

  }
  function run() {
    var y, value;
    value = document.getElementById("inputs").value
    var data = JSON.stringify({
      "data": value
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5000/stdin',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)

      .then(function (response) {
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });




    var config = {
      method: 'get',
      url: 'http://localhost:5000/folder',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    axios(config)

      .then(function (response) {
        console.log(response);


      })
      .catch(function (error) {
        console.log(error);
      });




    var config = {
      method: 'get',
      url: 'http://localhost:5000/folder',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    axios(config)

      .then(function (response) {
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });




    var config = {
      method: 'get',
      url: 'http://localhost:5000/folder',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    axios(config)

      .then(function (response) {
        console.log(response);


      })
      .catch(function (error) {
        console.log(error);
      })

  }
  function openbypath(path) {

    var replaced = path.replace(/\\/g, '/');
    setPath(replaced)
    var result = replaced.substring(replaced.lastIndexOf("/") + 1);
    var filename = result.split('.')[0]
    var data = JSON.stringify({
      "path": replaced
    });
    var config = {
      method: 'post',
      url: 'http://localhost:5000/read',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)

      .then(function (response) {
        console.log("data", response.data.text)
        var message = response.data.text;
        socket.emit('send-message', message);

        setDef(message)
        var lang = detectLang(message);
        var lang2 = lang.toLowerCase();
        if (lang2 == 'unknown') {
          lang2 = 'text';
        }

        setMode(lang2);
      })
      .catch(function (error) {
        console.log(error);
      });

    var data = JSON.stringify({
      "data": filename
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5000/readcomp',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)

      .then(function (response) {
        console.log(response);
        setRes(response.data.fileContent)

      })
      .catch(function (error) {
        console.log(error);
      });



  }

  async function open() {

    const { value: ipAddress } = await Swal.fire({
      title: 'Enter your Directory',
      input: 'text',
      inputLabel: 'Your Directory',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to put your work directory !'
        }
      }
    })

    if (ipAddress) {

      Swal.fire(`Your Directory is ${ipAddress}`)
      var replaced = ipAddress.replace(/\\/g, '/');

      setFile(replaced);
    }



  }
  function collapse() {
    var x;

    if (col == "col") {
      x = "Collapse";
      document.getElementById("mySidebar").style.width = "320px";
      document.getElementById("main").style.marginLeft = "320px";
      setCol("uncol")
      setSidebar(x)
    }
    if (col == "uncol") {
      x = "Uncollapse";
      document.getElementById("mySidebar").style.width = "320px";
      document.getElementById("main").style.marginLeft = "0px";
      setCol("col")
    }
    setSidebar(x)

  }
  function save() {
    var data = JSON.stringify({
      "path": path,
      "data": def
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5000/write',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)

      .then(function (response) {
        console.log(response);
        const Toast = Swal.mixin({
          toast: true,
          position: 'center-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Saving file'
        })
      })
      .catch(function (error) {
        console.log(error);
      });


  }


  function App() {
    return (

      <Tree
        className="sidebar"
        disableContextMenu={false}
        basePath={file}

        onItemSelected={selectedItem => openbypath(selectedItem.path)}

      />
    );


  }
  function But() {
    return (
      <button className="butt" onClick={collapse}>
        {sidebar}
      </button>
    );

  }
  function upback() {






    var data = JSON.stringify({
      "data": file
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5000/upbackend',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)

      .then(function (response) {
        console.log(response);

        const Toast = Swal.mixin({
          toast: true,
          position: 'center-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Uploading  file To the Server'
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  



}
async function invite()
{
  const { value: fruit } = await Swal.fire({
    title: 'Select field validation',
    input: 'select',
    inputOptions: {
      'Teachers': {
        apples: 'Apples',
        bananas: 'Bananas',
        grapes: 'Grapes',
        oranges: 'Oranges'
      },
  
    },
    inputPlaceholder: 'Select a Teacher',
    showCancelButton: true,
 
  })
  
  if (fruit) {
    Swal.fire(`You selected: ${fruit}`)
  }
}
function summary()
{
  
}
/*
   <button className="butt" onClick={() => handleOpenPicker()}>
            Upload To Drive
          </button>
          */
return (
  <Page title="Dashboard | Minimal-UI">
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

      </Stack>


      <div className="header">



        <center>
          <img src={logo} width="95px"></img>
        </center>
      </div>
      <div className="panel">
        <button className="butt" onClick={open}>
          {' '}
          Open Directory{' '}
        </button>
        <button className="butt" onClick={save}>
          {' '}
          Save File{' '}
        </button>
        <button className="butt" onClick={upback}>
          {' '}
          Upload To Server {' '}
        </button>

        <button className="butt" onClick={invite}>
          {' '}
          Invite(+) {' '}
        </button>
        <button className="butt" onClick={summary}>
          {' '}
          Summary {' '}
        </button>




        <But />
        <button className="butt" onClick={run} >Run</button>

        <div className="mode">
          {'Language: '}
          {Mode}
        </div>


      </div>
      <div id="mySidebar"   >
        <App />
      </div>

      <div className="content" id="main">
        <AceEditor

          name="editor"
          theme="monokai"
          onChange={onChange}
          mode={Mode}
          value={def}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          width="100%"
          height="620px"
          placeholder=""
          fontSize={17}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          readOnly={read}
          wrapEnabled={true}
          editorProps={{ $blockScrolling: true }}
        />
        <div className="button-container">
        </div>



        <textarea className="output" placeholder="Output:" value={res}>


        </textarea>
        <textarea id="inputs" className="inputs" placeholder="Write Your inputs here: ">


        </textarea>

      </div>

    </Container>
  </Page>
);
}
