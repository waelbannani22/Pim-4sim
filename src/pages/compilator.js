
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
 const [sol,setSol] = useState('')
  const [file, setFile] = useState('');
  const [path, setPath] = useState('');
  const [read, setRead] = useState(false);
const[soltT,setSoltT] = useState('');
  const [col, setCol] = useState('uncol')
  const [sidebar, setSidebar] = useState('Collapse')
  const [saveSt,setsaveSt] = useState()
  const [upSt,setupSt] =useState()
  const [conST,setconSt] =useState()
  const [conT,setconT] =useState()
  const[wrt,setwrt]=useState()
  const[sucT,setsucT] =useState()


console.log("pathhh",path)

  useEffect(()=>{
    if ( sessionStorage.getItem("role") == "teacher"){
   setFile('C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/work') 
   setsaveSt(true)
   setupSt(true)
   setconSt(true)
   setconSt(true)
   setconT(false)
   setwrt(false)
   setsucT(false)
  }
  if ( sessionStorage.getItem("role") == "student")
  {
setsaveSt(false)
setupSt(false)
setconSt(false)
setconSt(false)
setconT(true)
setwrt(true)
setsucT(true)
   }
  }
  )
  socket.on('receive-message', (message) => {
    setDef(message);
    setMode(detectLang(message))
  });
  const MINUTE_MS = 10000;

  useEffect(() => {
   
    const interval = setInterval(() => {
      console.log("role",sessionStorage.getItem("role"))
      console.log("path",path)
   if (( sessionStorage.getItem("role") == "student")&&(path!=''))
    {
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
          
        var data2 = JSON.stringify({
          "path": path,
          "data": def
        });
    
        var config = {
          method: 'post',
          url: 'http://localhost:5000/write',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data2
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
              title: 'Saving file and uploading to server'
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    
  

  
         
        })
        .catch(function (error) {
          console.log(error);
        });
  


      console.log('save every minute'); 
      }
    }, MINUTE_MS);
   
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])
  
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
  if  (sessionStorage.getItem("role") == "teacher")
    {
      var config = {
        method: 'get',
        url: 'http://localhost:5000/statusS',
        headers: {
          'Content-Type': 'application/json'
        },
      };
       axios(config)
    
        .then(function (response) {
          console.log(response.data.dataT);
          var x = response.data.dataT
    setRead(x)
    console.log("valchan",read)
    console.log("read t ",x)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    if  (sessionStorage.getItem("role") == "student")
    {
      var config = {
        method: 'get',
        url: 'http://localhost:5000/statusST',
        headers: {
          'Content-Type': 'application/json'
        },
      };
       axios(config)
    
        .then(function (response) {
          console.log(response.data.dataTT);
          var x = response.data.dataTT
    setRead(x)
    console.log("valchan",read)
    console.log("read t ",x)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
  
  function onChange(newValue) {
   
    console.log('change', newValue);
    var message = newValue;
    if ((sol=="true")||(soltT=="true"))

    {
       socket.emit('send-message', message);
    setDef(message)
    }
    setDef(message)

   
    if ((sol=="true")||(soltT=="true"))
    {
       socket.emit('send-message', message);
    setDef(message);
    }
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
        if ((sol=="true")||(soltT=="true"))
        { 
           socket.emit('send-message', message);

        setDef(message)

        }
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
    console.log("âth save",path)
    console.log("âth save",def)

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
  var config = {
    method: 'get',
    url: 'http://localhost:5000/teachers',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  axios(config)

    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  const { value: Teachers } = await Swal.fire({
    title: 'Select field validation',
    input: 'select',
    inputOptions: {
      Teachers: {
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
function wrong_files()
{
  var config = {
    method: 'get',
    url: 'http://localhost:5000/filef',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  axios(config)

    .then(function (response) {
      console.log(response.data.fileContent);
      var x = response.data.fileContent.toString()
      Swal.fire({
        icon: 'error',
        title: 'These Files Failed',
        text: x
        })


    })
    .catch(function (error) {
      console.log(error);
    })

   
}
async function success_files()
{
   var config = {
    method: 'get',
    url: 'http://localhost:5000/filet',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  await axios(config)

    .then(function (response) {
      console.log(response.data.fileContent);
      var x = response.data.fileContent.toString()
      Swal.fire({
        icon: 'success',
        title: 'These Files Successed',
        text: x
        })


    })
    .catch(function (error) {
      console.log(error);
    })
 
 
   
}
function connect()
{
  var config = {
    method: 'get',
    url: 'http://localhost:5000/listaw',
    headers: {
      'Content-Type': 'application/json'
    },
  };

   axios(config)

    .then(function (response) {
      var x = response.data.x
setSol(x)
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: 'Are you sure?',
  text: "the teacher will be able to modify your work !",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, i agree!',
  cancelButtonText: 'No, i dont !',
  reverseButtons: true
}).then((result) => {

  if (result.isConfirmed) {
    var data = JSON.stringify({
      "data": false
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5000/statusT',
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
  


    swalWithBootstrapButtons.fire(
      'Sccess!',
      'The teacher has access',
      'success'
    )
  } else if (

    result.dismiss === Swal.DismissReason.cancel
  ) {
    var data = JSON.stringify({
      "data": true
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5000/statusT',
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
  
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'The teacher dosent have access',
      'error'
    )
  }
})
})
   
 

}

function connectT()
{
  var config = {
    method: 'get',
    url: 'http://localhost:5000/listawT',
    headers: {
      'Content-Type': 'application/json'
    },
  };

   axios(config)

    .then(function (response) {
      var x = response.data.x
setSoltT(x)
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: 'Are you sure?',
  text: "the student will be able to modify your work!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes,i agree t!',
  cancelButtonText: 'No, i dont !',
  reverseButtons: true
}).then((result) => {

  if (result.isConfirmed) {
    var data = JSON.stringify({
      "data": false
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5000/statusTT',
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
  


    swalWithBootstrapButtons.fire(
      'Success!',
      'The student has access.',
      'success'
    )
  } else if (

    result.dismiss === Swal.DismissReason.cancel
  ) {
    var data = JSON.stringify({
      "data": true
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5000/statusTT',
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
  
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'The student dosent have access',
      'error'
    )
  }
})
})
   
 

}

function trigger()
{}


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
        <button className="butt" onClick={save}hidden={saveSt}>
          {' '}
          Save File{' '}
        </button>
        <button className="butt" onClick={upback}hidden={upSt}>
          {' '}
          Upload To Server {' '}
        </button>
        <button className="butt" onClick={connect}hidden={conST}>
          {' '}
          Connect{' '}
        </button>
        <button className="butt" onClick={connectT} hidden={conT}>
          {' '}
          Connect{' '}
        </button>
        <button className="butt" onClick={success_files} hidden={sucT}>
          {' '}
          Success files {' '}
        </button>
        <button className="butt" onClick={wrong_files}  hidden={wrt}>
          {' '}
          Wrong files {' '}
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
