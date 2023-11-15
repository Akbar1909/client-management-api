"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractObjectPart = void 0;
function extractObjectPart({ keys, obj, type = 'include', }) {
    if (type === 'include') {
        return keys.reduce((acc, cur) => ({ ...acc, [cur]: obj[cur] }), {});
    }
    return Object.keys(obj).reduce((acc, cur) => ({
        ...acc,
        ...(!keys.includes(cur) && { [cur]: obj[cur] }),
    }), {});
}
exports.extractObjectPart = extractObjectPart;
//# sourceMappingURL=extract-object-part.js.map