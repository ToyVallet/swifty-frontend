import { Tag } from 'antd';

type Props = {
  value: 'CLIENT' | 'SERVER';
};
export default function Badge({ value }: Props) {
  return <Tag color={value === 'CLIENT' ? 'warning' : 'error'}>{value}</Tag>;
}
