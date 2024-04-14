import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import {
  AppleOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  CoffeeOutlined,
  DesktopOutlined,
  LoginOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Order from "./components/Order";
import Ingredients from "./components/Ingredients";
import Dishes from "./components/Dishes";
import AddItem from "./components/AddItem";
import Dashboard from "./components/Dashboard";
import SubMenu from "antd/es/menu/SubMenu";
import SalesRaport from "./components/SalesRaport";
import IngredientRaport from "./components/IngredientRaport";
import Login from "./components/Login";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleCallback = (data: any) => {
    setIsAuthenticated(data);
  };

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="vertical"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          <p style={{ padding: "20px", textAlign: "center" }}>RESTAURANT</p>
          {isAuthenticated ? <>
          <Menu.Item key="1">
            <DesktopOutlined style={{ fontSize: "18px" }} />
            <span>Dashboard</span>
            <Link to="/" />
          </Menu.Item>
          <Menu.Item>
            <AppstoreOutlined style={{ fontSize: "18px" }} />
            <span>Add item</span>
            <Link to="/additem" />
          </Menu.Item>
          <Menu.Item>
            <AppleOutlined style={{ fontSize: "18px" }} />
            <span>Igredients</span>
            <Link to="/ingredients" />
          </Menu.Item>
          <Menu.Item>
            <CoffeeOutlined style={{ fontSize: "18px" }} />
            <span>Dishes</span>
            <Link to="/dishes" />
          </Menu.Item>
          <SubMenu
            icon=<BarChartOutlined style={{ fontSize: "18px" }}/>
            title="Raports">
            <Menu.Item>
              <BarChartOutlined style={{ fontSize: "18px" }} />
              <span>Sales raport</span>
              <Link to="/salesraport" />
            </Menu.Item>
            <Menu.Item>
              <BarChartOutlined style={{ fontSize: "18px" }} />
              <span>Ingredient sales raport</span>
              <Link to="/ingredientraport" />
            </Menu.Item>
          </SubMenu> </>
          : <></> }
          <Menu.Item>
            <PlusCircleOutlined style={{ fontSize: "18px" }} />
            <span>Order</span>
            <Link to="/order" />
          </Menu.Item>
          <Menu.Item>
            <LoginOutlined style={{ fontSize: "18px" }} />
            <span>Login</span>
            <Link to="/login" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: "0 16px", background: "white", marginBottom: "20px" }}>
          <Routes>
            {isAuthenticated ? <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/additem" element={<AddItem />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/salesraport" element={<SalesRaport />} />
            <Route path="/ingredientraport" element={<IngredientRaport />} />
            </> : <></> }
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login parentCallback={handleCallback} />} />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            bottom: 0,
            position: "fixed",
            width: "calc(100% - 200px)",
            background: "whitesmoke",
          }}
        >
          Created by Arkadiusz Zając and Konrad Warzecha
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
