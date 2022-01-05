"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = require("path");
var TournamentRouter_1 = require("./controllers/TournamentRouter");
var App = /** @class */ (function () {
    function App() {
        this.app = (0, express_1.default)();
        this.config();
        this.app.use('/api/v1/tournament', new TournamentRouter_1.TournamentRouter().router);
        this.app.use(express_1.default.static((0, path_1.join)(__dirname, 'static')));
        this.app.use(express_1.default.static((0, path_1.join)(__dirname, '..', 'dist', 'static')));
        this.app.use(express_1.default.static((0, path_1.join)(__dirname, 'dist', 'static')));
        this.app.get('/*', function (_, res) {
            res.sendFile((0, path_1.join)(__dirname + '/static/index.html'));
        });
    }
    App.prototype.config = function () {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH,DELETE');
            next();
        });
        this.app.use(function (req, res, next) {
            express_1.default.json()(req, res, function (err) {
                if (err) {
                    return res.sendStatus(400);
                }
                next();
            });
        });
    };
    return App;
}());
exports.default = new App().app;
