"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customSerialize = void 0;
const customSerialize = (data, fc) => {
    const validData = JSON.parse(JSON.stringify(data, (_, value) => typeof value === 'bigint' ? value.toString() : value));
    if (Array.isArray(validData) && fc) {
        return validData.map(fc);
    }
    return validData;
};
exports.customSerialize = customSerialize;
//# sourceMappingURL=serialize.js.map