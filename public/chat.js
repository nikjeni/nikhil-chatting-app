//Create  connection
var socket = io.connect();

//Query DOM
var message = document.querySelector("#message");
var handle = document.querySelector("#handle");
var btn = document.querySelector("#send");
var output = document.querySelector("#output");
var feedback = document.querySelector("#feedback");
var clearButton = document.querySelector('#clear');
var count = 0;

//Emit event
btn.addEventListener("click", function () {
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    });
    message.value = "";
});

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        document.title = "Nikhil Gavali's Chat App";
        count = 0;
    }
})

clearButton.addEventListener("click", function () {
    output.innerHTML = "";
    feedback.innerHTML = "";
    message.value = "";
    document.title = "Nikhil Gavali's Chat App";
    count = 0;
})

message.addEventListener("keypress", function (e) {
    socket.emit("typing", handle.value);
    var key = e.which || e.keyCode;
    if (key === 13) {
        socket.emit('chat', {
            handle: handle.value,
            message: message.value
        });
        message.value = "";
    }
});

//Listen event
socket.on("chat", function (data) {
    if (document.hidden) {
        count++;
        var newTitle = '(' + count + ')';
        document.title = newTitle;
    } else {
        document.title = "Nikhil Gavali's Chat App";
        count = 0;
    }
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
    output.scrollIntoView(false);
    feedback.innerHTML = "";
});

socket.on("typing", function (data) {
    feedback.innerHTML = "<p> <em>" + data + " is typing a message... </em> </p>";
});