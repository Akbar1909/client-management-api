"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterKeys = void 0;
function filterKeys(allKeys) {
    return (type = 'exclude', keys = []) => {
        if (type === 'include') {
            return keys.reduce((acc, cur) => ({ ...acc, [cur]: true }), {});
        }
        return {
            ...allKeys,
            ...keys.reduce((acc, cur) => ({ ...acc, [cur]: false }), {}),
        };
    };
}
exports.filterKeys = filterKeys;
//# sourceMappingURL=filterKeys-factory.js.map