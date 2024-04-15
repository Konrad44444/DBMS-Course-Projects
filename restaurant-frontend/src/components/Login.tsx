import { Button, Form, FormProps, Input } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

type FieldType = {
    username?: string;
    password?: string;
  };

function Login( props: any ) {

    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        {process.env.REACT_APP_LOGIN === values.username && process.env.REACT_APP_PASSWORD === values.password ?
            props.parentCallback(true) : props.parentCallback(false)}
      };
      
    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div style={{ padding: "40px" }}>

            <Title level={2}>Login</Title>

            <Form
    name="basic"
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
  </Form>
        </div>
    );

}

export default Login;