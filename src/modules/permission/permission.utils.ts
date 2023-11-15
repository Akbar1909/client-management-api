import { filterKeys } from 'src/utils/filterKeys-factory';

const clientKeys = {
  id: true,
  key: true,
  description: true,
  roles: true,
  label: true,
};

export const filterPermissionVisibleKeys =
  filterKeys<keyof typeof clientKeys>(clientKeys);
