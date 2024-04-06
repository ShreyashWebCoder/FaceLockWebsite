let video;
let canvas;        
let nameInput;     
video = document.getElementById("video")
    canvas = document.getElementById("canvas")
    nameInput = document.getElementById("name")
function init(){

    video = document.getElementById("video")
    canvas = document.getElementById("canvas")
    nameInput = document.getElementById("name")

    navigator.mediaDevices.getUserMedia({video:true})
        .then(stream=>{
            video.srcObject = stream
        })
        .catch(error=>{
            console.log("error access webcam",error)
            alert("Can Not Access Webcam")
        })
}


function capture(){
    const context = canvas.getContext("2d")
    context.drawImage(video,0,0,canvas.width,canvas.height)
    canvas.style.display = "block"
    canvas.style.display = "none"
}

function register(){
    const name = nameInput.value
    const photo = dataURItoBlob(canvas.toDataURL())

    if(!name||!photo){

        alert("Name and Photo Required PLease")
        return
    }

    const formData = new FormData()
    formData.append("name",name)
    formData.append("photo",photo, '${name}.jpeg')

    fetch("/register",{
        method:"POST",
        body:formData

    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
        }
        return response.json();
    })
    .then(data=>{
        if (data ) {
            alert("Registration Successful");
            window.location.href = "/";
        } else {
            alert("Registration Failed: " + data.message); // If server sends error message
        }

    })

    .catch(error=>{
        console.log("error",error)
    })
}

function login() {
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photo = dataURItoBlob(canvas.toDataURL());

    if (!photo) {
        alert("Photo Required");
        return;
    }

    const formData = new FormData();
    formData.append("photo", photo, "login.jpg");

    fetch("/login", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            alert("Login Successful");
            window.location.href = "/success?user-name=" + nameInput.value;
        } else {
            alert("Login Failed, Please Try again");
        }
    })
    .catch(error => {
        console.error("Fetch Error:", error);
        alert("An error occurred while trying to login. Please try again later.");
    });
}

function dataURItoBlob(dataURI){
    const byteString = atob(dataURI.split(",")[1]) // Fix typo here
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0] // Fix typo here

    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++){
        ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab],{type:mimeString})
}

init()
function goback() {
    window.history.back(); // Go back to the previous page
}
function registerpage() {
    // Redirect to the register page
    window.location.href = "/templates/newuser.html"; // Update the URL according to your route
}