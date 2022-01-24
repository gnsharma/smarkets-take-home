import { Outlet, Link } from 'react-router-dom';
import { PageHeader, Layout } from 'antd';

import Sidebar from './components/Sidebar';

import styles from './App.module.less';
import githubLogo from './assets/github-logo.png';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  return (
    <div className={styles.app}>
      <Layout style={{ height: '100%', width: '100%' }}>
        <Header style={{ padding: 0 }}>
          <PageHeader
            backIcon={false}
            title={<Link to="/">Smarkets</Link>}
            ghost={false}
            style={{ height: 'inherit' }}
          />
        </Header>

        <Layout>
          <Sider
            breakpoint="xs"
            style={{
              backgroundColor: 'lightslategray',
            }}
          >
            <Sidebar />
          </Sider>

          <Content>
            <div style={{ padding: 20, height: '100%', overflow: 'auto' }}>
              <Outlet />
            </div>
          </Content>
        </Layout>

        <Footer
          style={{
            backgroundColor: 'white',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <a href="https://github.com/gnsharma/smarkets-take-home">
            <img
              src={githubLogo}
              alt="Github Logo"
              style={{ height: 25, display: 'inline-block' }}
            />
          </a>
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
