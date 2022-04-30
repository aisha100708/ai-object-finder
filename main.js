video = "";
status1 = "";
name1 = "";
objects = [];
function setup() {
    canvas = createCanvas(730, 430);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    name1 = document.getElementById("input_name").value;
}
function modelLoaded() {
    console.log("model is loaded!");
    status1 = true;
}
function getResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }}
function draw() {
    image(video, 0, 0, 730, 430);
    if (status1 == true) {
        object_detector.detect(video, getResults);
        for(i=0;i<objects.length;i++) {
            fill("red");
            stroke("blue");
            percent = Math.floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == name1) {
                
                document.getElementById("status").innerHTML = "Status: Object Detected";
                document.getElementById("object_detected_or_not").innerHTML = name1 + " Found!";
                video.stop();
                object_detector.detect(getResults);
                var synth = window.speechSynthesis;
                var speak_data = name1 + " Found!";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_detected_or_not").innerHTML = name1 + " Not Found!";
                var synth = window.speechSynthesis;
                var speak_data = name1 + " Not Found!";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
        }
    }
}