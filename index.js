let constraintObj = {
    audio: true,
    video: {
        facingMode: "user",

    }
};



navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function (mediaStreamObj) {
        let video = document.querySelector('video');
        if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
        }



        video.onloadedmetadata = function (ev) {
            video.play();
        };


        let start = document.getElementById('btn');
        let stop = document.getElementById('btn2');
        let vidSave = document.getElementById('vid2');
        let mediaRecorder = new MediaRecorder(mediaStreamObj);

        let chunks = [];

        start.addEventListener('click', (ev) => {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
        })
        stop.addEventListener('click', (ev) => {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
        })

        mediaRecorder.ondataavailable = function (ev) {
            chunks.push(ev.data);
        }
        mediaRecorder.onstop = (ev) => {
            let blob = new Blob(chunks, { 'type': 'video/mp4' });
            chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
            vidSave.src = videoURL;
        }
    })
    .catch(function (err) {
        console.log(err.name, err.message);
    });