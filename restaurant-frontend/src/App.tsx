import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import Inventory from './components/Inventory';
import { AppstoreOutlined, DesktopOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="vertical" style={{fontSize: '18px', fontWeight: 'bold'}}>
          <p style={{padding: '20px', textAlign: 'center'}}>RESTAURANT</p>
          <Menu.Item key="1">
            <DesktopOutlined style={{fontSize: '18px'}} />
            <span>Dashboard</span>
            <Link to="/" />
          </Menu.Item>
          <Menu.Item>
            <AppstoreOutlined style={{fontSize: '18px'}} />
            <span>Inventory</span>
            <Link to="/inventory" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: "0 16px", background: "white" }}>
          <Routes>
            <Route path="/inventory" element={<Inventory/>} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center', bottom: 0, position: 'fixed', width: 'calc(100% - 200px)', background: 'whitesmoke'}}>
          Created by Arkadiusz Zając and Konrad Warzecha
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;