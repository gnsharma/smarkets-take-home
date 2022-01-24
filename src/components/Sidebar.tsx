import { List } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.less';

const SPORTS = [
  { name: 'Football', id: 'football' },
  { name: 'Cricket', id: 'cricket' },
  { name: 'Tennis', id: 'tennis' },
];

const Sidebar = () => {
  return (
    <List
      dataSource={SPORTS}
      renderItem={(item) => (
        <List.Item>
          <Link to={`/${item.id}`} style={{ color: 'white', paddingLeft: 20 }}>
            {item.name}
          </Link>
        </List.Item>
      )}
      style={{ paddingTop: 20 }}
    />
  );
};

export default Sidebar;
