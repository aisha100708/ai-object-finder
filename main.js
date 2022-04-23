video = "";
status1 = "";
name1 = "";
function setup() {
    canvas = createCanvas(730, 430);
    canvas.center();
    video = createVideo("video.mp4");
    video.hide();
}
function draw() {
    image(video, 0, 0, 730, 430);
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