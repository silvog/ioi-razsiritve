var audioStream = null;
var mediaRecorder;
var audioBLOB;

var timeOfSaving;
var fileNameOfSaving;
var fileType = 'audio';

var fileName = getTimestamp() + '.wav';  // or "wav" or "ogg"

var formData = new FormData();
formData.append(fileType + '-filename', fileName);

formData.append(fileType + '-blob', audioBLOB);


function xhr(url, data, callback) {
    console.log("XHR");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            console.log("200 - shranjena datoteka");
        }
    };
    request.open('POST', url);
    request.send(data);
}


function getTimestamp() {
    var currentdate = new Date();

    return {
        "name": currentdate.getDate() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getFullYear() + "_"
        + currentdate.getHours() + "-"
        + ('0' + currentdate.getMinutes()).slice(-2) + '-' + ('0' + currentdate.getSeconds()).slice(-2),
        "time": currentdate.toISOString()
    };

}


function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}

function onMediaSuccess(stream) {

    audioStream = stream;

    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.stream = stream;
    mediaRecorder.mimeType = "audio/wav";//document.getElementById('audio-mimeType').value;
    mediaRecorder.audioChannels = 1;//!!document.getElementById('left-channel').checked ? 1 : 2;
}

function onMediaError(e) {
    console.error('media error', e);
}

var index = 1;
// below function via: http://goo.gl/B3ae8c
function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
// below function via: http://goo.gl/6QNDcI
function getTimeLength(milliseconds) {
    var data = new Date(milliseconds);
    return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
}

function recordAudio() {

    var audioPlayer = document.getElementById("audioNameRecord");

    audioPlayer = mergeProps(audioPlayer, {
        controls: false,
        muted: false
    });

    mediaRecorder.ondataavailable = function (blob) {
        mediaRecorder.pause();

        audioBLOB = blob;

        var fileType = 'audio';

        var timestampTemp = getTimestamp();
        var fileName = timestampTemp.name + '.wav';

        timeOfSaving = timestampTemp.time;
        fileNameOfSaving = timestampTemp.name;

        var formData = new FormData();
        formData.append(fileType + '-filename', fileName);

        formData.append(fileType + '-blob', audioBLOB);

        xhr('/razsiritve/server/save.php', formData, function (fileURL) {

        });
        
        saveImages();

        var url11 = URL.createObjectURL(blob);
        audioPlayer.src = url11;
        audioPlayer.load();
        audioPlayer.play();

    };

    var timeInterval = 6 * 2000;//document.querySelector('#time-interval').value;

    mediaRecorder.start(timeInterval);

}

function resumeRecord() {
    mediaRecorder.resume();
}

function makePOSTRequest(formData) {
    var xhrReq = new XMLHttpRequest();
    xhrReq.open('POST', '/razsiritve/server/upload_images.php');

    xhrReq.onreadystatechange = function () {
        if (xhrReq.readyState == 4 && xhrReq.status == 200) {
            console.log("200 - shranjena slika");
        }
    };

    xhrReq.send(formData);
}

function makePOSTRequestDB(formData) {
    var xhrReq = new XMLHttpRequest();
    xhrReq.open('POST', '/razsiritve/server/database_insert.php');

    xhrReq.onreadystatechange = function () {
        if (xhrReq.readyState == 4 && xhrReq.status == 200) {
            console.log("200 - shranjeni podatki v podatkovno bazo");
        }
    };

    xhrReq.send(formData);
}


function saveImages() {

    var fileTypeI = 'image';
    var fileNameI = fileNameOfSaving + '_left' + '.png';

    var formDataI = new FormData();

    //for database
    formDataI.append('predpona', fileNameOfSaving);
    formDataI.append('cas', timeOfSaving);
    makePOSTRequestDB(formDataI);

    formDataI = new FormData();

    formDataI.append(fileTypeI + '-filename', fileNameI);
    formDataI.append(fileTypeI + '-blob', levaIzbira);

    makePOSTRequest(formDataI);

    fileNameI = fileNameOfSaving + '_right' + '.png';

    formDataI = new FormData();
    formDataI.append(fileTypeI + '-filename', fileNameI);

    formDataI.append(fileTypeI + '-blob', desnaIzbira);

    makePOSTRequest(formDataI);

    fileNameI = fileNameOfSaving + '_user' + '.png';

    formDataI = new FormData();
    formDataI.append(fileTypeI + '-filename', fileNameI);

    formDataI.append(fileTypeI + '-blob', userImageURL);
    makePOSTRequest(formDataI);

    
}