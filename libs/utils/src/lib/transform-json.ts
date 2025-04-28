// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformJson = ({ value }: { value: any }) =>
  value ? JSON.parse(value) : value;
