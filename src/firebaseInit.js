import { getMessaging } from "firebase/compat/messaging";
import { initializeApp } from "firebase/app";
 import firebase from 'firebase/compat/app';
 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5aD0XvP6lWzD5suVLO54m05RaSngJtLM",
  authDomain: "allinone-345122.firebaseapp.com",
  projectId: "allinone-345122",
  storageBucket: "allinone-345122.appspot.com",
  messagingSenderId: "790224334277",
  appId: "1:790224334277:web:ef6e2aefe80bb2e8246fac",
  measurementId: "G-DQCKNX8BE6"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging()


const { REACT_APP_KEYFIRE} = process.env;
const publicKey = REACT_APP_KEYFIRE;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: "BHiNFgHzNKC202rF7Lvx8_B4vzKtElVM40jMDeT_fl4TxVTcqd7cKqEAgcVW3_Og8zf9V0x2vzwz94SRRa2gUaA" });
  
    if (currentToken) {
      setTokenFound(true);
      sessionStorage.setItem("tokenfirebase",currentToken)
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });