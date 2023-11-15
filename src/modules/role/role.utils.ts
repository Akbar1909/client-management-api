import { filterKeys } from 'src/utils/filterKeys-factory';

const clientKeys = {
  id: true,
  name: true,
  description: true,
  permissions: true,
};

export const filterRoleVisibleKeys =
  filterKeys<keyof typeof clientKeys>(clientKeys);
