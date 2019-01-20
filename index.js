var express = require("express");
var app = express();
var socket = require("socket.io");

var server = app.listen(process.env.port || process.env.PORT || 9090, function () {
    console.log("Listening on port 9090");
});

app.use(express.static("public"));

var io = socket(server);

io.on("connection", function (socket) {
    socket.on("chat", function (data) {
        socket.emit("chat", data)
    });

    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data)
    });
});



