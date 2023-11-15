import { filterKeys } from 'src/utils/filterKeys-factory';

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

export const filterClientVisibleKeys =
  filterKeys<keyof typeof clientKeys>(clientKeys);
