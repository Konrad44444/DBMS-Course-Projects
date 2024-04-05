import { Button, Form, FormProps, Input, InputNumber, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";

type Ingredient = {
  name?: string;
  price?: number;
  quantity?: number;
};

const ingredients: Ingredient[] = [
  { name: "Tomato", price: 0.25, quantity: 15 },
  { name: "Potato", price: 0.15, quantity: 15 },
  { name: "Cucumber", price: 0.35, quantity: 15 },
];

type Dish = {
  name?: string;
  price?: number;
  ingredients?: number[];
};

const onFinishDish: FormProps<Dish>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailedDish: FormProps<Dish>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const onFinishIngredient: FormProps<Ingredient>["onFinish"] = (values) => {
  let body = JSON.stringify({
    name: values.name,
    price: values.price,
    quantity: values.quantity,
  });

  postIngredient(body);
};

const postIngredient = async (body: string) => {
  fetch("http://localhost:8080/ingredient", {
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

const onFinishFailedIngredient: FormProps<Ingredient>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};

function Inventory() {
  return (
    <div style={{ width: "100%", backgroundColor: "white" }}>
      <div
        style={{
          width: "calc(50% - 20px)",
          display: "inline-block",
          padding: "40px",
          borderRadius: "10px",
          background: "whitesmoke",
          margin: "10px",
        }}
      >
        <Form
          name="dish"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishDish}
          onFinishFailed={onFinishFailedDish}
          autoComplete="yes"
        >
          <Form.Item<Dish>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input dish name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Dish>
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                min: 0.01,
                message: "Please input price bigger than 0.01!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item<Dish>
            label="Ingredients"
            name="ingredients"
            rules={[{ required: true, message: "Please choose ingredients!" }]}
          >
            <Select>
              {ingredients.map((ingredient) => (
                <Select.Option value={ingredient.name}>
                  {ingredient.name} | {ingredient.price} zł
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add dish
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div
        style={{
          width: "calc(50% - 20px)",
          display: "inline-block",
          paddingTop: "10px",
          paddingLeft: "25px",
          borderRadius: "10px",
          background: "whitesmoke",
          margin: "10px",
          paddingBottom: "20px",
        }}
      >
        <Form
          name="ingredient"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishIngredient}
          onFinishFailed={onFinishFailedIngredient}
          autoComplete="off"
          layout="vertical"
        >
          <Title level={2}>Insert new ingredient</Title>
          <Form.Item<Ingredient>
            label={"Name"}
            name={"name"}
            rules={[
              { required: true, message: "Please insert ingredient name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Ingredient>
            label={"Price"}
            name={"price"}
            rules={[
              {
                required: true,
                message: "Please insert ingredient price",
                // min: 0.01,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item<Ingredient>
            label={"Quantity"}
            name={"quantity"}
            rules={[
              {
                required: true,
                message: "Please insert ingredient quantity",
                // min: 1,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Inventory;
