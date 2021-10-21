"use strict";
/*
 * @Author: jiangjin
 * @Date: 2021-09-24 11:58:47
 * @LastEditTime: 2021-10-21 15:09:51
 * @LastEditors: jiangjin
 * @Description:
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = exports.isDev = void 0;
exports.isDev = process.env.NODE_ENV == 'development';
console.log('[process.env.NODE_ENV]:', process.env.NODE_ENV);
// api接口地址
exports.BASE_URL = exports.isDev ? 'https://api.sheepdex.org' : 'https://api.sheepdex.org';
