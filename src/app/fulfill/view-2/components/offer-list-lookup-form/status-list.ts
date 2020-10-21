export class StatusItem {
  name: string;
  value: string;
}

export const statusList: Array<StatusItem> = [
  {
    name: 'Active',
    value: '1'
  },
  {
    name: 'Accepted',
    value: '3'
  },
  {
    name: 'Expired',
    value: '5'
  },
  {
    name: 'All',
    value: null
  }
];
