"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var http_1 = require("http");
var mongoose_1 = require("mongoose");
var port = process.env.PORT || 5000;
var server = new http_1.Server(app_1.default);
server.listen(port, function () {
    console.log("Listening on port ".concat(port, " "));
});
var db = "mongodb+srv://bzouss:dddsales@sales-cluster.pjvvs.mongodb.net/abcompany?retryWrites=true&w=majority";
(0, mongoose_1.connect)(db)
    .then(function () {
    console.log('db connected');
})
    .catch(function (err) { return console.log(err); });
