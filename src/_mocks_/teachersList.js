import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
import axios from "axios";
// ----------------------------------------------------------------------
import { useEffect, useState } from 'react';

try {

  var config2 = {
    method: 'get',
    url: 'http://localhost:5000/admin/fetchteacher',
    headers: {
      'Content-Type': 'application/json',

    },
    
  };
  axios(config2)
    .then(function (response1) {
      
      var result = response1.data.data
     localStorage.setItem("result",result)
       
     // console.log("users",re)
    })
    .catch(function (error) {
      console.log(error);
    });



  //console.log(data);
} catch (error) {
  console.log("failure")
}

var res = localStorage.getItem("result")
const users = res

export default users;
