"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.subtract5Hours = exports.format = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const isLeapYear_1 = __importDefault(require("dayjs/plugin/isLeapYear"));
require("dayjs/locale/zh-cn");
dayjs_1.default.extend(isLeapYear_1.default);
dayjs_1.default.locale('zh-cn');
dayjs_1.default.extend(utc_1.default);
function format(date, separator = '.') {
    if (!(date instanceof Date)) {
        throw new Error('Invalid "date" argument. You must pass a date instance');
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}#${month}#${year}`.replaceAll('#', separator);
}
exports.format = format;
function subtract5Hours(date) {
    date.setHours(date.getHours() - 5);
    return date;
}
exports.subtract5Hours = subtract5Hours;
function formatDate(date, format = 'YYYY-MM-DD') {
    return (0, dayjs_1.default)(date).format(format);
}
exports.formatDate = formatDate;
exports.default = dayjs_1.default;
//# sourceMappingURL=time.js.map