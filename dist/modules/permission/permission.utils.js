"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPermissionVisibleKeys = void 0;
const filterKeys_factory_1 = require("../../utils/filterKeys-factory");
const clientKeys = {
    id: true,
    key: true,
    description: true,
    roles: true,
    label: true,
};
exports.filterPermissionVisibleKeys = (0, filterKeys_factory_1.filterKeys)(clientKeys);
//# sourceMappingURL=permission.utils.js.map