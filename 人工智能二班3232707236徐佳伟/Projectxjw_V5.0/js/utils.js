/**
 * 工具函数模块
 * 包含：日期格式化、星期获取、时间更新、设备检测等通用功能
 */

// ========== 日期格式化扩展 ==========
/**
 * Date对象格式化方法
 * @param {string} format - 格式化模板，如 'yyyy-MM-dd hh:mm:ss'
 * @returns {string} 格式化后的日期字符串
 */
Date.prototype.format = function(format) {
    var args = {
        "M+": this.getMonth() + 1,       // 月份
        "d+": this.getDate(),             // 日
        "h+": this.getHours(),            // 时
        "m+": this.getMinutes(),          // 分
        "s+": this.getSeconds(),          // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds()       // 毫秒
    };

    // 年份处理
    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }

    // 月、日、时、分、秒、毫秒处理
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? n : ("00" + n).substr(("" + n).length)
            );
        }
    }

    return format;
};

// ========== 星期获取函数 ==========
/**
 * 获取星期几的中文名称
 * @param {Date} date - 日期对象
 * @returns {string} 星期几的中文名称
 */
function getWeek(date) {
    var week = date.getDay();
    var weekNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weekNames[week];
}

// ========== 设备检测 ==========
/**
 * 检测是否为移动设备
 * @returns {boolean} 是否为移动设备
 */
var mobile = false;
var device = navigator.userAgent;
if (device.indexOf("iPhone") > 0 || device.indexOf("Android") > 0 || device.indexOf("iPad") > 0) {
    mobile = true;
}

// ========== 时间更新函数 ==========
/**
 * 更新页面上的时间显示
 */
function updateTime() {
    var now = new Date();
    var timeString = now.format("hh:mm:ss");
    var dataString = now.format("yyyy-MM-dd");
    var timeDom = document.getElementById("current-time");

    if (timeDom) {
        // 移动端只显示时间，桌面端显示日期和时间
        timeDom.innerHTML = mobile ? timeString : dataString + " " + timeString;
    }
}

// ========== 页面加载初始化 ==========
document.addEventListener("DOMContentLoaded", function() {
    // 初始化时间显示
    updateTime();
    // 每秒更新时间
    setInterval(updateTime, 1000);
});

// ========== 通用工具函数 ==========

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间(毫秒)
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 限制时间(毫秒)
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit) {
    var inThrottle;
    return function() {
        var context = this;
        var args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * 生成唯一ID
 * @returns {string} 唯一ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * 格式化金额
 * @param {number} amount - 金额
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的金额
 */
function formatAmount(amount, decimals) {
    decimals = decimals || 2;
    return parseFloat(amount).toFixed(decimals);
}

/**
 * 本地存储封装
 */
var Storage = {
    /**
     * 设置本地存储
     * @param {string} key - 键名
     * @param {*} value - 值
     */
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage set error:', e);
        }
    },

    /**
     * 获取本地存储
     * @param {string} key - 键名
     * @param {*} defaultValue - 默认值
     * @returns {*} 存储的值
     */
    get: function(key, defaultValue) {
        try {
            var value = localStorage.getItem(key);
            return value ? JSON.parse(value) : (defaultValue || null);
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue || null;
        }
    },

    /**
     * 删除本地存储
     * @param {string} key - 键名
     */
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Storage remove error:', e);
        }
    },

    /**
     * 清空本地存储
     */
    clear: function() {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('Storage clear error:', e);
        }
    }
};
