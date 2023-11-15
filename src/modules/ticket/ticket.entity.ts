export enum TicketStatus {
  TASK_DONE = 'task_done',
  BUG_REPORT = 'bug_report',
  FILE_EXCHANGE = 'file_exchange',
  REQUEST = 'request',
}

export interface TicketEntity {
  id: number;
  clientId: number;
  operatorId: number;
  developerId: number;
  status: TicketStatus;
  telegramMessageId: string;
  description: string;
  attachments: number[];
  bugFixDate: string;
  updatedById: number;
  typeId: number;
}
