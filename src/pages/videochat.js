// material
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
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
// components
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

import './assets/css/app.css'
import'./assets/js/rtc.js'
import './assets/js/events.js'
import htmlt from './index.html'
import  stream from './ws/stream' ;
import socket from './assets/js/socketchat'
import React, { useState, Component, useRef, useCallback, useEffect,  forwardRef,
  useImperativeHandle } from 'react';
  import { Navigate } from "react-router-dom";

stream(socket)

// ----------------------------------------------------------------------
export default function VideoChat() { 
  useEffect(()=>{
 if (localStorage.getItem("linkchat")!='')
  {
    console.log("fro");
    <Navigate to={localStorage.getItem("linkchat")}replace={true} />

  }
  },[])
 

  return (
      <div   dangerouslySetInnerHTML={{__html:htmlt}}/>

  );
}
