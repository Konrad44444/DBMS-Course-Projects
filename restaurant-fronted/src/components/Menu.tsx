import { Input, Checkbox, Button, Form, FormProps, InputNumber } from "antd";

type Ingredient = {
    name?: string;
    price?: number;
    quantity?: number;
};

type Dish = {
    name?: string;
    price?: number;
    ingredients?: number[];
}

  const onFinish: FormProps<Ingredient>["onFinish"] = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<Ingredient>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

function Menu() {
    return(
        <>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
            <Form.Item<Ingredient>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input ingredient name!' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item<Ingredient>
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input ingredient price!' }]}
            >
            <InputNumber />
            </Form.Item>

            <Form.Item<Ingredient>
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input ingredient initial quantity!' }]}
            >
            <InputNumber />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>

        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
            <Form.Item<Ingredient>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input ingredient name!' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item<Ingredient>
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input ingredient price!' }]}
            >
            <InputNumber />
            </Form.Item>

            <Form.Item<Ingredient>
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input ingredient initial quantity!' }]}
            >
            <InputNumber />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
        </>
    )
}

export default Menu;