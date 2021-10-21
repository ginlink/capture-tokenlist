"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenList = void 0;
/*
 * @Author: jiangjin
 * @Date: 2021-10-21 15:04:49
 * @LastEditTime: 2021-10-21 15:09:59
 * @LastEditors: jiangjin
 * @Description:
 *
 */
var httpClient_1 = __importDefault(require("./httpClient"));
var getTokenList = function () {
    return httpClient_1.default.get('/getTokenList');
};
exports.getTokenList = getTokenList;
