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
exports.downloadImg = void 0;
var path_1 = __importDefault(require("path"));
/*
 * @Author: jiangjin
 * @Date: 2021-10-21 15:39:28
 * @LastEditTime: 2021-10-21 16:13:37
 * @LastEditors: jiangjin
 * @Description:
 *
 */
var fs = require('fs');
var request = require('request');
var imgCounter = 0;
function downloadImg(imgs, targetPath) {
    return __awaiter(this, void 0, void 0, function () {
        var len, _loop_1, writeStream, readStream, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    len = imgs.length;
                    _loop_1 = function (i) {
                        var src, filename, targetFile;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    src = imgs[i];
                                    return [4 /*yield*/, new Promise(function (re) {
                                            return setTimeout(function () {
                                                re(void 0);
                                            }, 1000);
                                        })];
                                case 1:
                                    _b.sent();
                                    filename = src.split('/').pop();
                                    targetFile = path_1.default.join(targetPath, filename === null || filename === void 0 ? void 0 : filename.toLowerCase());
                                    writeStream = fs.createWriteStream(targetFile);
                                    readStream = request(src);
                                    readStream.pipe(writeStream);
                                    readStream.on('end', function () {
                                        console.log("\u6587\u4EF6\u4E0B\u8F7D\u6210\u529F");
                                    });
                                    readStream.on('error', function (err) {
                                        // console.log(1)
                                        console.log('错误信息:' + err);
                                    });
                                    writeStream.on('finish', function () {
                                        console.log("\u6587\u4EF6\u5199\u5165\u6210\u529F[" + filename + "]\uFF0C\u5F53\u524D\u7B2C" + ++imgCounter + " / " + len);
                                        writeStream.end();
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < len)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    ++i;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.downloadImg = downloadImg;