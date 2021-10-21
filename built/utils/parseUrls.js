"use strict";
/*
 * @Author: jiangjin
 * @Date: 2021-10-21 15:11:58
 * @LastEditTime: 2021-10-21 15:26:36
 * @LastEditors: jiangjin
 * @Description:
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrls = void 0;
var misc_1 = require("../constants/misc");
function parseUrls(tokenList) {
    return tokenList.filter(function (item) { return item.chainId == misc_1.CAPTURE_CHAINID; }).map(function (item) { return item.logoURI; });
}
exports.parseUrls = parseUrls;
