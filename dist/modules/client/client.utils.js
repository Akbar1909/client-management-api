"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterClientVisibleKeys = void 0;
const filterKeys_factory_1 = require("../../utils/filterKeys-factory");
const clientKeys = {
    id: true,
    name: true,
    contactPhone: true,
    contactName: true,
    pcCount: true,
    serverAddress: true,
    hardwareId: true,
    notes: true,
    status: true,
    contractDueTo: true,
    tgGroupId: true,
    regDate: true,
};
exports.filterClientVisibleKeys = (0, filterKeys_factory_1.filterKeys)(clientKeys);
//# sourceMappingURL=client.utils.js.map