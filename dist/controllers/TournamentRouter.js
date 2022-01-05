"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentRouter = void 0;
var express_1 = require("express");
var fs_1 = require("fs");
var path_1 = require("path");
var multer_1 = __importDefault(require("multer"));
var archiver_1 = __importDefault(require("archiver"));
var Tournament_schema_1 = require("../data/Tournament.schema");
var generatehtml_1 = require("../site-generator/generatehtml");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'dist/static');
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Math.round(Math.random() * 1e6);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
var TournamentRouter = /** @class */ (function () {
    function TournamentRouter() {
        this.upload = (0, multer_1.default)({ storage: storage });
        this.router = (0, express_1.Router)();
        this.initializeRouter();
    }
    TournamentRouter.prototype.initializeRouter = function () {
        var _this = this;
        this.router.get('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tmid, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tmid = req.params.id;
                        return [4 /*yield*/, Tournament_schema_1.Tournament.findById(tmid)];
                    case 1:
                        result = _a.sent();
                        res.status(200).send(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).send(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        /* tournament data and log upload */
        this.router.post('/', function (req, res, next) {
            console.log('route reached', req.url);
            next();
        }, this.upload.single('image'), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        req.body.logoLink = "".concat((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
                        result = new Tournament_schema_1.Tournament(req.body);
                        return [4 /*yield*/, result.save()];
                    case 1:
                        _b.sent();
                        res.status(200).send({ success: true, result: result });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.log(error_2);
                        res.status(500).send(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        /* generate website and send it */
        this.router.get('/download/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tmid, result, htmlData, htmlpath, imgpath, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tmid = req.params.id;
                        return [4 /*yield*/, Tournament_schema_1.Tournament.findById(tmid)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new Error('Tournament not found');
                        }
                        htmlData = (0, generatehtml_1.generateHtml)(result);
                        htmlpath = (0, path_1.join)(__dirname, '..', 'static', 'client.html');
                        (0, fs_1.writeFileSync)(htmlpath, htmlData);
                        imgpath = (0, path_1.join)(__dirname, '..', 'static', result.logoLink);
                        /* calls archiver */
                        this.zipFiles(imgpath, result.logoLink, htmlpath, 'index.html', res);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        res.status(500).send(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    TournamentRouter.prototype.zipFiles = function (imgpath, imgname, htmlpath, htmlname, res) {
        return __awaiter(this, void 0, void 0, function () {
            var output, archive;
            return __generator(this, function (_a) {
                output = (0, fs_1.createWriteStream)(__dirname + '/project.zip');
                archive = (0, archiver_1.default)('zip', {
                    zlib: { level: 1 }, // Sets the compression level.
                });
                output.on('end', function () {
                    console.log('Data has been drained');
                });
                output.on('close', function () {
                    console.log(archive.pointer() + ' total bytes');
                    console.log('archiver has been finalized and the output file descriptor has closed.');
                    res.download(__dirname + '/project.zip'); // Set disposition and send it.
                });
                archive.on('warning', function (err) {
                    console.log(err);
                });
                archive.on('error', function (err) {
                    console.log(err);
                });
                // pipe archive data to the output file
                archive.pipe(output);
                // append files
                archive.file(imgpath, {
                    name: imgname,
                });
                archive.file(htmlpath, { name: htmlname });
                // finalize the archive (ie we are done appending files but streams have to finish yet)
                // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
                archive.finalize();
                return [2 /*return*/];
            });
        });
    };
    return TournamentRouter;
}());
exports.TournamentRouter = TournamentRouter;
