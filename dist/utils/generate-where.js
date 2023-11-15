"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWhere = void 0;
function generateWhere(query) {
    let where = {};
    for (const [key, value] of Object.entries(query)) {
        where = {
            ...where,
            ...(typeof value !== 'number' && !value ? {} : { [key]: value }),
        };
    }
    return where;
}
exports.generateWhere = generateWhere;
//# sourceMappingURL=generate-where.js.map