"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterRoleVisibleKeys = void 0;
const filterKeys_factory_1 = require("../../utils/filterKeys-factory");
const clientKeys = {
    id: true,
    name: true,
    description: true,
    permissions: true,
};
exports.filterRoleVisibleKeys = (0, filterKeys_factory_1.filterKeys)(clientKeys);
//# sourceMappingURL=role.utils.js.map