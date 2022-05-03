// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

import React, { useState ,useEffect} from "react";
import Notifications from './components/notificationss';
import ReactNotificationComponent from './components/Reactnotifications';
import { getToken, onMessageListener } from './firebaseInit';
import firebase from 'firebase/compat/app';
import "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";


// ----------------------------------------------------------------------

export default function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  
  
  //***********************sign to topic******************************//
 
  //*********************listner on noti*********************************//
  useEffect(()=>{
    
     onMessageListener()
  .then((payload) => {
    console.log("payload",payload)
    setShow(true);
    setNotification({
      title: payload.notification.title,
      body: payload.notification.body,
    });
  })
  .catch((err) => console.log("failed: ", err));
  })
 
  return (
    <div>
    {
      show?(
        <ThemeConfig>
      <ScrollToTop />
      <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
      ):(
          <ThemeConfig>
      <ScrollToTop />
     
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
      )
    }
 
    <Notifications/>
   </div>
  );
}
