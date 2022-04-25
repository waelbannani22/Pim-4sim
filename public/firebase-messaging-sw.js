// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef

importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyD5aD0XvP6lWzD5suVLO54m05RaSngJtLM",
  authDomain: "allinone-345122.firebaseapp.com",
  projectId: "allinone-345122",
  storageBucket: "allinone-345122.appspot.com",
  messagingSenderId: "790224334277",
  appId: "1:790224334277:web:ef6e2aefe80bb2e8246fac",
  measurementId: "G-DQCKNX8BE6"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
   
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});