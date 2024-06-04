"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccesToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
function createAccesToken(payload) {
    dotenv_1.default.config();
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
}
exports.createAccesToken = createAccesToken;
