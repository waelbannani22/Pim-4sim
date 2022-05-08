import helpers from './helpers.js';
import Swal from 'sweetalert2'
import { useEffect } from 'react';
var axios = require('axios');

window.addEventListener('load', () => {
  
       // window.location.reload()
  
    
    //When the chat icon is clicked
    document.querySelector('#toggle-chat-pane').addEventListener('click', (e) => {
        let chatElem = document.querySelector('#chat-pane');
        let mainSecElem = document.querySelector('#main-section');

        if (chatElem.classList.contains('chat-opened')) {
            chatElem.setAttribute('hidden', true);
            mainSecElem.classList.remove('col-md-9');
            mainSecElem.classList.add('col-md-12');
            chatElem.classList.remove('chat-opened');
        }

        else {
            chatElem.attributes.removeNamedItem('hidden');
            mainSecElem.classList.remove('col-md-12');
            mainSecElem.classList.add('col-md-9');
            chatElem.classList.add('chat-opened');
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout(() => {
            if (document.querySelector('#chat-pane').classList.contains('chat-opened')) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300);
    });


    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById('local').addEventListener('click', () => {
        if (!document.pictureInPictureElement) {
            document.getElementById('local').requestPictureInPicture()
                .catch(error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error(error);
                });
        }

        else {
            document.exitPictureInPicture()
                .catch(error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error(error);
                });
        }
    });




    //When the 'Create room" is button is clicked
    document.getElementById('create-room').addEventListener('click', (e) => {
        e.preventDefault();

        let roomName = document.querySelector('#room-name').value;
        let yourName = sessionStorage.getItem('firstname');
       
        if (roomName && yourName) {
            //remove error message, if any
            document.querySelector('#err-msg').innerText = "";

            //save the user's name in sessionStorage

            //create room link
            let roomLink = `${location.origin}/dashboard/videochat?room=${roomName.trim().replace(' ', '_')}_${helpers.generateRandomString()}`;
            console.log(roomLink)
            var data3 = ({
                "title": "videochat added to " + JSON.parse(sessionStorage.getItem("class")).title,
                "description": roomLink,
                "type": "mail",
                "users": JSON.parse(sessionStorage.getItem("listid")),
    
                "motif": "new videochat "
            });
            const headers = {
                'Content-Type': 'application/json',
            };
            axios.post('http://localhost:5000/api/notifications/createnotification', data3, { headers }).then((res) => {
                console.log(res);
                console.log(res.data);
    
            });
            
           // window.location.reload()
           
            localStorage.setItem("linkchat", roomLink)
            //show message with link to room
            document.querySelector('#room-created').innerHTML = `Room successfully created. Click <a href='${roomLink}'>here</a> to enter room. 
                Share the room link with your partners.`;

            //empty the values
            document.querySelector('#room-name').value = '';
        }

        else {
            document.querySelector('#err-msg').innerText = "All fields are required";
        }
    });


    //When the 'Enter room' button is clicked.
    document.getElementById('enter-room').addEventListener('click', (e) => {
        e.preventDefault();

        let name = document.querySelector('#username').value;

        if (name) {
            //remove error message, if any
            document.querySelector('#err-msg-username').innerText = "";

            //save the user's name in sessionStorage
            localStorage.setItem('username', name);

            //reload room
            location.reload();
        }

        else {
            document.querySelector('#err-msg-username').innerText = "Please input your name";
        }
    });
    //When the 'Enter room' button is clicked.
    document.getElementById('drive').addEventListener('click', (e) => {
        helpers.open()

    });


    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('expand-remote-video')) {
            helpers.maximiseStream(e);
        }

        else if (e.target && e.target.classList.contains('mute-remote-mic')) {
            helpers.singleStreamToggleMute(e);
        }
    });


    document.getElementById('closeModal').addEventListener('click', () => {
        helpers.toggleModal('recording-options-modal', false);
    });
});

