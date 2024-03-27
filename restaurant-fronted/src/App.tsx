import { Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import { ConfigProvider, Flex, Layout, theme } from 'antd';
import { calc } from 'antd/es/theme/internal';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <ConfigProvider
    theme={{
      algorithm: theme.defaultAlgorithm,
    }}
    >
      
              <Routes>
                <Route path="/menu" element={ <Menu/> } />
              </Routes>

    </ConfigProvider>
  );
}

export default App;
