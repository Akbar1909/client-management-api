"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeItMap = void 0;
function makeItMap(array, key) {
    const table = new Map();
    array.forEach((item, i) => {
        table.set(item[key], { ...item, i });
    });
    return table;
}
exports.makeItMap = makeItMap;
//# sourceMappingURL=makeItMap.js.map