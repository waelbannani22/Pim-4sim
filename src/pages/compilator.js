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
  const[pathy,setPathy]  = useState('')
  const[locpath,setLocpath] = useState('')
  const[locfile,setLocfile] = useState('')
  const[drop,setDrop]=useState('')
  const[direr,setdirer]=useState('')
  const[invt,setinvt]=useState('')
  const[invs,setinvs]=useState('')
 const [teacbn,setteacbn] = useState(false)
 const [studbn,setstudbn] = useState(false)
const [sostud,setsostud]= useState('')
const [sotea,setsotea]= useState('')

      var pol= sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname")
      console.log("feferf",pol)
     var data = JSON.stringify({
       "data": pol
     });
 
     var config = {
       method: 'post',
       url: 'http://localhost:5000/checkteacher',
       headers: {
         'Content-Type': 'application/json'
       },
       data: data
     };
 
     axios(config)
 
       .then(function (response) {
         var x = response.data.x
         console.log("solt",response.data.x);

 setSoltT(x)    
     console.log("soltT",soltT);

       })
       .catch(function (error) {
         console.log(error);
       });

       var data = JSON.stringify({
        "data": soltT
      });
  
      var config = {
        method: 'post',
        url: 'http://localhost:5000/socketteacher',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
  
      axios(config)
  
        .then(function (response) {

        })
        .catch(function (error) {
          console.log(error);
        });
 
    
 
      var pol2= sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname")
      console.log("feferf2",pol2)
     var data = JSON.stringify({
       "data": pol2
     });
 
     var config = {
       method: 'post',
       url: 'http://localhost:5000/checkstudent',
       headers: {
         'Content-Type': 'application/json'
       },
       data: data
     };
 
     axios(config)
 
       .then(function (response) {
        console.log("sol",response.data.x);

         var y = response.data.x
         
     setSol(y)     
     console.log("sol",sol);

       })
       .catch(function (error) {
         console.log(error);
       });


     var data = JSON.stringify({
       "data": sol
     });
 
     var config = {
       method: 'post',
       url: 'http://localhost:5000/socketstudent',
       headers: {
         'Content-Type': 'application/json'
       },
       data: data
     };
 
     axios(config)
 
       .then(function (response) {



       })
       .catch(function (error) {
         console.log(error);
       });
    
    var config = {
      method: 'get',
      url: 'http://localhost:5000/getsocketteacher',
      headers: {
        'Content-Type': 'application/json'
      },
    };
     axios(config)
  
      .then(function (response) {
        console.log(response.data.dataTeacher);
        var x = response.data.dataTeacher
  setsotea(x)
  console.log("sostea",x);
  console.log("soltT",soltT)


      })
      .catch(function (error) {
        console.log(error);
      })
      var config = {
        method: 'get',
        url: 'http://localhost:5000/getsocketstudent',
        headers: {
          'Content-Type': 'application/json'
        },
      };
       axios(config)
    
        .then(function (response) {
          console.log(response.data.dataStudent);
          var x = response.data.dataStudent
    setsostud(x)
    console.log("sostud",x);
    console.log("sol",sol)

  
        })
        .catch(function (error) {
          console.log(error);
        })
  useEffect(() => { 
    
  if((sessionStorage.getItem("role")=="student")&&(localStorage.getItem("lastwork")!='')&&(file==''))
  
  {
      setFile(localStorage.getItem("lastwork"))
  }

     }, [file]);
  useEffect(() => { 
    if((sessionStorage.getItem("role")=="student")&&(path!=''))    
    {   
    localStorage.setItem("lastfile",path)
    }

 if((sessionStorage.getItem("role")=="student")&&(localStorage.getItem("lastfile")!='')&&(path==''))    
{   
  

    setLocpath(localStorage.getItem("lastfile"))
       console.log("local file variable ",locfile)
       var data = JSON.stringify({
        "data": localStorage.getItem("lastfile")
      });
  
      var config = {
        method: 'post',
        url: 'http://localhost:5000/readsingle',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
  
      axios(config)
  
        .then(function (response) {
          console.log(response);
          setDef(response.data.fileContent)
  
        })
        .catch(function (error) {
          console.log(error);
        });
  
}
  }, [path]);


  useEffect(()=>{
    if ( sessionStorage.getItem("role") == "teacher"){

   setFile('C:/Users/leowa/Downloads/Compressed/AdvancedNodeAuth-master/AdvancedNodeAuth-master/uploads/work') 
   setsaveSt(true)
   setupSt(true)
   setconSt(true)
   setconSt(false)
   setconT(true)
   setwrt(false)
   setsucT(false)
   setinvt(true)
   setinvs(false)
  }
  if ( sessionStorage.getItem("role") == "student")
  {
    setsaveSt(false)
    setupSt(false)
    setconSt(false)
    setconSt(true)
    setconT(false)
    setwrt(true)
    setsucT(true)
    setinvt(false)
    setinvs(true)
   }
  }
  ) 
 

 

  if (((sotea=="true"&& sessionStorage.getItem("role") == "teacher"))||((sostud=="true"&& sessionStorage.getItem("role") == "student")))
  {
   socket.on('receive-message', (message) => {
    setDef(message);
    setMode(detectLang(message))
  });
}

   
   
  useEffect(()=>
  {
    if (sessionStorage.getItem("role")=="student")
    {
    var y="";
    var x =""
          var data = JSON.stringify({
            "data": def
          });
        
          var config = {
            method: 'post',
            url: 'http://localhost:5000/def',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };
        
          axios(config)
        
            .then(function (response) {
              y= response.data.def
              var config = {
                method: 'get',
                url: 'http://localhost:5000/pathy',
                headers: {
                  'Content-Type': 'application/json'
                },
              };
            
              axios(config)
            
                .then(function (response) {
                  console.log("pathy",data)
             x = localStorage.getItem("lastfile")
            
            console.log("role",sessionStorage.getItem("role"))
          
          if (( sessionStorage.getItem("role") == "student")&&(x!=''))
          {
            console.log("pag",x)
            console.log("datax",y)
            var data = JSON.stringify({
              "path": x,
              "data": y
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
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              
            
            
              })
              .catch(function (error) {
                console.log(error);
              });
          }
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
          }
  },[def])
  
  
 
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
   
    var message = newValue;

console.log('sol',sol)
if (((sotea=="true"&& sessionStorage.getItem("role") == "teacher"))||((sostud=="true"&& sessionStorage.getItem("role") == "student")))
{
    
       socket.emit('send-message', message);
    setDef(message)
    
    }
    setDef(message)

   
    if (((sotea=="true"&& sessionStorage.getItem("role") == "teacher"))||((sostud=="true"&& sessionStorage.getItem("role") == "student")))
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
    /*
    var y="";
    var x =""
          var data = JSON.stringify({
            "data": newValue
          });
        
          var config = {
            method: 'post',
            url: 'http://localhost:5000/def',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };
        
          axios(config)
        
            .then(function (response) {
              y= response.data.def
              var config = {
                method: 'get',
                url: 'http://localhost:5000/pathy',
                headers: {
                  'Content-Type': 'application/json'
                },
              };
            
              axios(config)
            
                .then(function (response) {
             x = response.data.pathdir
            console.log("role",sessionStorage.getItem("role"))
          
          if (( sessionStorage.getItem("role") == "student")&&(x!=''))
          {
            var data = JSON.stringify({
              "path": x,
              "data": y
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
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              
            
            
              })
              .catch(function (error) {
                console.log(error);
              });
          }
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
      
         
       
    */

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
    console.log("sesss",sessionStorage.getItem("lastwork"))
    var data = JSON.stringify({
      "path": replaced,
      "path2":sessionStorage.getItem("lastwork")
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
        if (((sotea=="true"&& sessionStorage.getItem("role") == "teacher"))||((sostud=="true"&& sessionStorage.getItem("role") == "student")))
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
      localStorage.setItem("lastwork",replaced)
      setDef('')

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
  
  var e = document.getElementById("framework");
  var strUser = e.options[e.selectedIndex].text;
  

    var data = JSON.stringify({
      "data": strUser
    
    });
  console.log("im student")
    var config = {
      method: 'post',
      url: 'http://localhost:5000/listaw',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
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
  
 
  var e = document.getElementById("framework");
  var strUser = e.options[e.selectedIndex].text;
  

    var data = JSON.stringify({
      "data": strUser
    
    });
  console.log("im teacher")
    var config = {
      method: 'post',
      url: 'http://localhost:5000/listawT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
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
      'The teacher dosent have access',
      'error'
    )
  }
})
})
 

}
async function inviteS()
{
  

  var config = {
    method: 'get',
    url: 'http://localhost:5000/getstud',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  axios(config)

    .then(function (response) {
      console.log(response.data.data);
      var test = document.getElementById("framework");
var arr = response.data.data;  
for(var i=test.options.length- 1;i>= 0;i--) {test.remove(i);}        
for(i in arr) {test.add(new Option(arr[i],i));}
      
    })
    .catch(function (error) {
      console.log(error);
    })
  
}

async function inviteT()
{
  

  var config = {
    method: 'get',
    url: 'http://localhost:5000/getteach',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  axios(config)

    .then(function (response) {
      console.log(response.data.data);
      var test = document.getElementById("framework");
var arr = response.data.data;  
for(var i=test.options.length- 1;i>= 0;i--) {test.remove(i);}        
for(i in arr) {test.add(new Option(arr[i],i));}
      
    })
    .catch(function (error) {
      console.log(error);
    })
  
}
function Disconnect()
{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#30D643',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, disconnect it!'
  }).then((result) => {
    if (result.isConfirmed) { 
               socket.emit('forceDisconnect');

      Swal.fire(

        'Disconenct!',
        'Your are now Disconnected.',
        'success'
      )
    }
  })

}
/*
const MINUTE_MS = 20000;

  useEffect(() => {
    const interval = setInterval(() => {  
var y="";
var x =""
      var data = JSON.stringify({
        "data": def
      });
    
      var config = {
        method: 'post',
        url: 'http://localhost:5000/def',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
    
      axios(config)
    
        .then(function (response) {
          y= response.data.def
          var config = {
            method: 'get',
            url: 'http://localhost:5000/pathy',
            headers: {
              'Content-Type': 'application/json'
            },
          };
        
          axios(config)
        
            .then(function (response) {
         x = response.data.pathdir
        console.log("role",sessionStorage.getItem("role"))
      console.log("x=====",x)
      console.log("y=====",y)
      
      if (( sessionStorage.getItem("role") == "student")&&(x!=''))
      {
        var data = JSON.stringify({
          "path": x,
          "data": y
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
                  title: 'Saving And Uploading  file To the Server'
                })
              })
              .catch(function (error) {
                console.log(error);
              });
          
        
        
          })
          .catch(function (error) {
            console.log(error);
          });
      }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
  
     
   
  

      console.log('save every minute'); 
      
    }, MINUTE_MS);
   
    return () => clearInterval(interval);
  }, [def])
*/

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
      <div className="panelcomp">
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
        <button className="butt" onClick={inviteT} hidden={invt} >
          {' '}
          invite {' '}
        </button>
        <button className="butt" onClick={inviteS} hidden={invs} >
          {' '}
          invite {' '}
        </button>
        <select className="butt "id="framework">

</select>
<button className="butt" onClick={Disconnect}  >
          {' '}
          Disconnect {' '}
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