import qs from "qs"
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (typeof time === 'string') {
            if (/^[0-9]+$/.test(time)) {
                // support "1548221490638"
                time = parseInt(time);
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/');
            }
        }

        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value]; }
        return value.toString().padStart(2, '0');
    });
    return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000;
    } else {
        time = +time;
    }
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚';
    } else if (diff < 3600) {
    // less 1 hour
        return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return parseTime(time, option);
    } else {
        return (
            d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
        );
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    const search = url.substring(url.lastIndexOf('?') + 1);
    const obj = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s += 2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--;
    }
    return s;
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function paramone(json) {
    return qs.stringify(json)
}

export function param(json) {
  if (!json) return '';
  return cleanArray(
      Object.keys(json).map(key => {
          if (json[key] === undefined) return '';
          return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
      })
  ).join('&');
}


/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse(
        '{"' +
    decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
    '"}'
    );
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
    const div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText;
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
    if (typeof target !== 'object') {
        target = {};
    }
    if (Array.isArray(source)) {
        return source.slice();
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property];
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty);
        } else {
            target[property] = sourceProperty;
        }
    });
    return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }
    let classString = element.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += '' + className;
    } else {
        classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90;
    } else {
        return new Date(new Date().toDateString());
    }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function() {
    // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function(...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone');
    }
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys]);
        } else {
            targetObj[keys] = source[keys];
        }
    });
    return targetObj;
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
    return Array.from(new Set(arr));
}

/**
 * @returns {string}
 */
export function createUniqueString() {
    const timestamp = +new Date() + '';
    const randomNum = parseInt((1 + Math.random()) * 65536) + '';
    return (+(randomNum + timestamp)).toString(32);
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

export function setFileSizeFormate(size) {
    if (size > 1024 * 1024) {
        return `${(size / (1024 * 1024)).toFixed(2)}mb/s`;
    } else if (size > 1024) {
        return `${(size / 1024).toFixed(2)}kb/s`;
    } else {
        return `${size.toFixed(2)}b/s`;
    }
}
export function checkFileType(url, type) {
    const videoTypes = ['raw', 'WMF', 'webp', 'AVI', 'mov', 'rmvb', 'rm', 'FLV', 'mp4', '3GP', 'MP4'];
    // let imgTypes = ['bmp', 'jpg', 'JPG', 'png', 'tif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai'];
    const imgTypes = ['jpg', 'JPG', 'png', 'PNG', 'jpeg'];
    const fileExtension = url.split('.').pop();
    if (type === 'img') {
        if (imgTypes.indexOf(fileExtension.toLowerCase()) !== -1) {
            return { b: true };
        } else if (imgTypes.indexOf(fileExtension) === -1) {
            if (videoTypes.indexOf(fileExtension) !== -1) {
                return {
                    toast: '请上传图片',
                    b: false
                };
            } else {
                return {
                    toast: '暂不支持格式',
                    b: false
                };
            }
        }
    } else if (type === 'video') {
        if (videoTypes.indexOf(fileExtension) !== -1) {
            return { b: true };
        } else if (videoTypes.indexOf(fileExtension) === -1) {
            if (imgTypes.indexOf(fileExtension) !== -1) {
                return {
                    toast: '请上传视频',
                    b: false
                };
            } else {
                return {
                    toast: '暂不支持格式',
                    b: false
                };
            }
        }
    } else {
        const types = videoTypes.concat(imgTypes);
        if (types.indexOf(fileExtension) !== -1) {
            return { b: true };
        } else if (types.indexOf(fileExtension) === -1) {
            return {
                toast: '暂不支持此格式的文件',
                b: false
            };
        }
    }
}

export function checkFileTypes(url, types) {
    const fileExtension = url.split('.').pop();
    if (types.indexOf(fileExtension.toLowerCase()) !== -1) {
        return { b: true };
    } else {
        return {
            toast: '暂不支持此格式的文件',
            b: false
        };
    }
}
export function checkImageFile(url) {
    const types = [
        'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'];
    const fileExtension = url.split('.').pop();
    if (types.indexOf(fileExtension.toLowerCase()) !== -1) {
        return 'img';
    } else {
        return 'others';
    }
}

// 下载excel 传一个blob类型的数据
export function downloadExcel(blob, title) {
    const _blob = new Blob([blob], {
        type: 'application/vnd.ms-excel'
    });
    const url = window.URL.createObjectURL(_blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = title ? `${title}.xlsx` : '导出表格.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
}

import CryptoJS from 'crypto-js';

// DES加密
export function encryptByDES(message, key) {
    let keyHex = CryptoJS.enc.Utf8.parse(key);
    let encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
}
// des解密
export const decryptDes = (ciphertext, key) => {
    const KeyHex = CryptoJS.enc.Utf8.parse(key); // 将key转换成 wordArray
    // 因为是base64的密文，所以不用转16进制hex
    const decrypted = CryptoJS.TripleDES.decrypt(ciphertext, KeyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

