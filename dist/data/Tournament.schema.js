"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tournament = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    tournamentName: { type: String, required: true },
    accentColor: { type: String, required: true },
    brandColor: { type: String, required: true },
    logoLink: { type: String, required: true },
    playersNumber: { type: Number, default: 0 },
    streamLink: { type: String, default: '#' },
});
exports.Tournament = (0, mongoose_1.model)('Tournament', schema);
