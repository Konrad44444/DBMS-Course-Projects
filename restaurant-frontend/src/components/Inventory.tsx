import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, InputNumber, Select, Space, Typography } from "antd";
import Card from "antd/es/card";
import List from "antd/es/list";

type Ingredient = {
    id?: number;
    name?: string;
    price?: number;
    quantity?: number;
};

const ingredients: Ingredient[] = [
    {id: 1, name: "Tomato", price: 0.25, quantity: 15},
    {id: 2, name: "Potato", price: 0.15, quantity: 15},
    {id: 3, name: "Cucumber", price: 0.35, quantity: 15}
]

type Dish = {
    id?: number;
    name?: string;
    price?: number;
    ingredients?: number[];
}

const onFinishDish: FormProps<Dish>["onFinish"] = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailedDish: FormProps<Dish>["onFinishFailed"] = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

function Inventory() {
    return(
        <div style={{width: '100%', backgroundColor: 'white'}}>
            <div style={{width: 'calc(50% - 20px)', display: 'inline-block',
                        padding: '40px', borderRadius: '10px', background: 'whitesmoke',
                        margin: '10px'}}>
                
                <Typography.Title style={{ margin: '10px' }}>
                    Add a dish
                </Typography.Title>

                <Form
                    name="dish"
                    layout="vertical"
                    labelCol={{ span: 16 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishDish}
                    onFinishFailed={onFinishFailedDish}
                    autoComplete="yes"
                >
                    <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input dish name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input price bigger than 0.01!' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.List name="ingredients">
                        {(fields: { [x: string]: any; key: any; name: any; }[], { add, remove }: any) => (
                            <>
                            {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item label='Ingredient'
                                    {...restField}
                                    name={[name, 'ingredients']}
                                    rules={[{ required: true, message: 'Missing ingredient' }]}
                                >
                                    <Select
                                    style={{width: '175px'}}>
                                        {ingredients.map((ingredient) => (
                                            <Select.Option value={ingredient.id}>{ingredient.name}</Select.Option>
                                    ))}
                                    </Select>
                                </Form.Item>
                                 <Form.Item label='Quantity'
                                    {...restField}
                                    name={[name, 'quantity']}
                                    rules={[{ required: true, message: 'Missing quantity' }]}
                                >
                                    <InputNumber />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                            ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                             Add ingredient
                            </Button>
                        </Form.Item>
                        </>
                    )}
                    </Form.List>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Add dish
                        </Button>
                    </Form.Item>
                </Form>  
                
            </div>

            <div style={{width: 'calc(50% - 20px)', display: 'inline-block',
                        padding: '40px', borderRadius: '10px', background: 'whitesmoke',
                        margin: '10px'}}>



            </div>

            <div style={{width: 'calc(50% - 20px)', display: 'inline-block',
                        padding: '40px', borderRadius: '10px', background: 'whitesmoke',
                        margin: '10px'}}>

                <Typography.Title style={{ margin: '10px' }}>
                    Dish list
                </Typography.Title>

            </div>

            <div style={{width: 'calc(50% - 20px)', display: 'inline-block',
                        padding: '40px', borderRadius: '10px', background: 'whitesmoke',
                        margin: '10px'}}>

                <Typography.Title style={{ margin: '10px' }}>
                    Ingredient list
                </Typography.Title>

                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={ingredients}
                    renderItem={(item) => (
                    <List.Item>
                        <Card title={item.name}>
                            Price: {item.price} zł
                            Quantity: {item.quantity}
                        </Card>
                    </List.Item>
                    )}
                />

            </div>

        </div>
    )
}

export default Inventory;