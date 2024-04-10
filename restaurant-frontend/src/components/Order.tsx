import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, InputNumber, Select, Space, Typography } from "antd";
import { useEffect, useState } from "react";

type Ingredient = {
    id?: number;
    name?: string;
    price?: number;
    quantity?: number;
  };

type DishGet = {
    id?: number;
    name?: string;
    price?: number;
    ingredients?: [{ ingredient: Ingredient; quantity: number }];
};

type Order = {
    email?: string;
    name?: string;
    dishes?: [{ dishId: number, quantity: number}]
}

const postOrder = async (body: string) => {
    fetch("http://localhost:8080/order", {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

function Order() {

    const [dishesGet, setDishesGet] = useState<Ingredient[]>([]);

    useEffect(() => {
      fetch("http://localhost:8080/dish", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setDishesGet(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }, []);

    const onFinish: FormProps["onFinish"] = (values: Order) => {
        console.log(values);
        let body = JSON.stringify ({
            email: values.email,
            name: values.name,
            dishes: values.dishes
        })
        postOrder(body);
    };
      
    const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(

        <div style={{width: 'calc(100% - 20px)', height: '100%', display: 'inline-block',
                    padding: '40px', borderRadius: '10px', background: 'whitesmoke',
                    margin: '10px'}}>

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

                <Typography.Title style={{ margin: '10px' }}>
                    Place a order
                </Typography.Title>

                <Typography.Paragraph style={{ margin: '20px 10px 10px 10px', fontSize: '20px' }}>
                    Order details
                </Typography.Paragraph>

                <Form.List name="dishes">
                {(
                fields: { [x: string]: any; key: any; name: any }[],
                { add, remove }: any
                ) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                    <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8, width: "100%" }}
                        align="baseline"
                    >
                        <Form.Item
                        label="Dish"
                        {...restField}
                        name={[name, "id"]}
                        rules={[
                            { required: true, message: "Missing dish" },
                        ]}
                        >
                            <Select style={{ width: "200px" }}>
                                {dishesGet != undefined &&
                                dishesGet.map((dish: DishGet) => (
                                    <Select.Option value={dish.id}>
                                    {dish.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item style={{width: "100%"}}
                            label="Quantity"
                            {...restField}
                            name={[name, "quantity"]}
                            rules={[{ required: true, message: "Missing quantity" }]}
                            >
                                <InputNumber style={{width: "200px"}} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                    ))}
                    <Form.Item>
                    <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                    >
                        Add dish
                    </Button>
                    </Form.Item>
                </>
                )}
            </Form.List>

                <Typography.Paragraph style={{ margin: '20px 10px 10px 10px', fontSize: '20px' }}>
                    Customer details
                </Typography.Paragraph>

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

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Order
                    </Button>
                </Form.Item>
            </Form>

        </div>

    );

}

export default Order;