import { Button, Form, FormProps, Input, Typography } from "antd";

function Order() {

    const onFinish: FormProps["onFinish"] = (values) => {
        console.log('Success:', values);
      };
      
    const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(

        <div style={{width: 'calc(100% - 20px)', height: '100%', display: 'inline-block',
                    padding: '40px', borderRadius: '10px', background: 'whitesmoke',
                    margin: '10px'}}>

            <Typography.Title style={{ margin: '10px' }}>
                Place a order
            </Typography.Title>

            <Form
                name="order"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>

    );

}

export default Order;