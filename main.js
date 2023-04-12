objects = [];
video = "";
status = "";
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}


function setup(){
    canvas= createCanvas(600,450);
    canvas.center();
}

function draw(){
    image(video, 0,0,600,450);
    if(status != ""){
        objectDetector.detect(video, gotResult);
    for(i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected: " + objects.length;
        fill("red");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    }
    
}

function gotResult(error, results){
if(error){
    console.log(error);

} else{
    console.log(results);
    objects = results;
}

}

function start(){
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";

}

function modelLoaded(){
    console.log("The model is loaded");
    status = true;
    video.loop();
    video.speed(2);
    video.volume(1);
}
