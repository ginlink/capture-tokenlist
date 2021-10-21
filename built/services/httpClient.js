"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var config_1 = require("./config");
/**
 * 二次封装axios
 * @param {String} method Ajax请求类型 'POST'|'PUT'|'GET'|'DELETE'
 * @param {String} url 请求地址
 * @param {Object} params  参数
 * @returns Promise<T>
 */
function apiAxios(method, url, params) {
    return new Promise(function (resolve, reject) {
        // axios.defaults.headers.common.Authorization = localStorage.getItem('accessToken')
        // 设置默认头部
        var instance = axios_1.default.create({
            baseURL: config_1.BASE_URL,
            timeout: 60000,
        });
        instance[method.toLowerCase()](url, {
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' || method === 'PATCH' ? params : null,
            withCredentials: false,
        })
            .then(function (res) {
            if ((res === null || res === void 0 ? void 0 : res.status) === 200) {
                resolve(res.data);
            }
            else {
                reject('Axios返回状态不对，查看请求处理过程．．．．');
            }
        })
            .catch(function (err) {
            var _a;
            var errCode = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status;
            switch (errCode) {
                case 400:
                    console.log('错误请求');
                    break;
                case 401:
                    // 权限处理 重新登录 清空token
                    // window.location.href = '#/login'
                    console.log('请求错误,权限问题');
                    break;
                case 403:
                    // window.location.href = '#/login'
                    console.log('请求错误,权限问题');
                    break;
                case 404:
                    console.log('请求错误,未找到该资源');
                    break;
                case 405:
                    console.log('请求方法未允许');
                    break;
                case 408:
                    console.log('请求超时');
                    break;
                case 500:
                    console.log('服务器端出错');
                    break;
                case 501:
                    console.log('网络未实现');
                    break;
                case 502:
                    console.log('网络错误');
                    break;
                case 503:
                    console.log('服务不可用');
                    break;
                case 504:
                    console.log('网络超时');
                    break;
                default:
                    console.log('未知错误');
            }
            // 由于请求接口较少，业务层不再处理错误
            // 抓取所有异常，统一处理
            console.log('[httpClient-err]:', err);
            // if (true) {
            //   // 只处理我需要处理的
            //   console.log('[httpClient-err]:', err)
            // } else {
            //   // 如果需要业务层处理，则再抛出去
            //   throw err
            // }
        });
    });
}
exports.default = {
    get: function (url, params) {
        if (params === void 0) { params = {}; }
        return apiAxios('GET', url, params);
    },
    post: function (url, params) {
        return apiAxios('POST', url, params);
    },
    put: function (url, params) {
        return apiAxios('PUT', url, params);
    },
    delete: function (url, params) {
        return apiAxios('DELETE', url, params);
    },
    patch: function (url, params) {
        return apiAxios('PATCH', url, params);
    },
};
