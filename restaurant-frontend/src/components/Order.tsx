import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, InputNumber, notification, NotificationArgsProps, Select, Space, Typography } from "antd";
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
    amount?: number;
    email?: string;
    name?: string;
    dishes?: [{ dishId: number, quantity: number}]
}

type NotificationPlacement = NotificationArgsProps["placement"];

function Order() {

    const [dishesGet, setDishesGet] = useState<DishGet[]>([]);
    let amounts: number[] = [];
    let totalAmount: number = 0;
    const [orderForm] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

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

    const onValuesChange = (changedValues: Order, allValues: Order) => {
        amounts = [];
        totalAmount = 0;
        allValues.dishes?.forEach((element) => {
            if(element !== undefined && element.quantity !== null) {
                var amount = dishesGet.find(x => x.id === element.dishId)?.price as number * element.quantity;
                amounts = [...amounts, amount];
                totalAmount += amount;
            }
        })
    }

    const onFinish: FormProps["onFinish"] = (values: Order) => {
        console.log(values);
        let body = JSON.stringify ({
            totalAmount: totalAmount,
            customerEmail: values.email as string,
            customerName: values.name as string,
            dishes: values.dishes
        })
        postOrder(body);
        orderForm.resetFields();
    };
      
    const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const openNotification = (data: Order, placement: NotificationPlacement) => {

        let message = (
            <div>
                <h3>Successfully placed order</h3>
                <p>Name: {data.name}</p>
                <p>Email: {data.email}</p>
                <p>Ordered items:</p>
                {data.dishes?.map(dish => {
                    return(
                        <p>&emsp{dishesGet.find(x => x.id === dish.dishId)?.name} - {dishesGet.find(x => x.id === dish.dishId)?.price} zł - {dish.quantity} pcs</p>
                    )
                })}
                <p>Total amount: {data.amount} zł</p>
            </div>
        );
          
        api['success']({
          message: "Success",
          description:
            message,
          placement,
        });
      };

    const postOrder = async (body: string) => {
        console.log(body);
        fetch("http://localhost:8080/order", {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: body,
        })
          .then((response) => response.json())
          .then((data) => openNotification(data, "topRight"))
          .catch((error) => console.error(error));
      };

    return(

        <div style={{width: 'calc(100% - 20px)', height: '100%', display: 'inline-block',
                    padding: '40px', borderRadius: '10px', background: 'whitesmoke',
                    margin: '10px'}}>
        {contextHolder}
            <Form
                form={orderForm}
                name="order"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={onValuesChange}
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
                        name={[name, "dishId"]}
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
                    label="Name"
                    name="name"
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