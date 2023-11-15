import { filterKeys } from 'src/utils/filterKeys-factory';

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

export const filterTicketVisibleKeys =
  filterKeys<keyof typeof ticketKeys>(ticketKeys);
