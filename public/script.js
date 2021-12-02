const socket = io('/');
const videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
let myVideoStream;
myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  });

socket.emit('create or join', ROOM_ID);

socket.on('user-connected', () => {
  connecToNewUser();
});

const connecToNewUser = () => {
  console.log('new user connected');
}

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
};
