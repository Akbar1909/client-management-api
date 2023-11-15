"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTicketVisibleKeys = void 0;
const filterKeys_factory_1 = require("../../utils/filterKeys-factory");
const ticketKeys = {
    id: true,
    client: true,
    clientId: true,
    operator: true,
    operatorId: true,
    developer: true,
    developerId: true,
    status: true,
    telegramMessageId: true,
    description: true,
    attachments: true,
    bugFixDate: true,
    regDate: true,
};
exports.filterTicketVisibleKeys = (0, filterKeys_factory_1.filterKeys)(ticketKeys);
//# sourceMappingURL=ticket.utils.js.map