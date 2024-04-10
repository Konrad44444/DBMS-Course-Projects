import { Typography, List, Card, Button, Form, Input, InputNumber, FormProps } from "antd";
import { useEffect, useState } from "react";

type Ingredient = {
  id?: number;
  name?: string;
  price?: number;
  quantity?: number;
  threshold?: number;
};

const updateIngredient = async (body: string, id: string) => {
  fetch("http://localhost:8080/ingredient/" + id, {
    method: "PUT",
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

function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/ingredient", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setIngredients(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onFinishFailedIngredient: FormProps<Ingredient>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishIngredient: FormProps<Ingredient>["onFinish"] = (values: Ingredient) => {
    let body = JSON.stringify({
      id: values.id,
      name: values.name,
      price: values.price,
      quantity: values.quantity,
      threshold: values.threshold,
    });
  
    updateIngredient(body, values.id?.toString() as string);
  };

  return (
    <div style={{padding: "40px"}}>
      <Typography.Title>Ingredient list</Typography.Title>

      <List
        style={{ marginTop: "10px" }}
        grid={{ gutter: 16, column: 1 }}
        dataSource={ingredients}
        renderItem={(item: Ingredient) => (
          <List.Item>
            <Form
              name="ingredient"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: false }}
              onFinish={onFinishIngredient}
              onFinishFailed={onFinishFailedIngredient}
              autoComplete="off"
              layout="inline"
            >
              <Typography.Title style={{ margin: "10px" }}>
                {item.name}
              </Typography.Title>

              <Form.Item<Ingredient>
                label={"Id"}
                name={"id"}
              >
                <InputNumber placeholder={item.id?.toString()} disabled/>
              </Form.Item>

              <Form.Item<Ingredient>
                label={"Name"}
                name={"name"}
                rules={[
                  { required: true, message: "Please insert ingredient name" },
                ]}
              >
                <Input placeholder={item.name} />
              </Form.Item>

              <Form.Item<Ingredient>
                label={"Price"}
                name={"price"}
                rules={[
                  {
                    required: true,
                    message: "Please insert ingredient price",
                  },
                ]}
              >
                <InputNumber placeholder={item.price?.toString()} />
              </Form.Item>

              <Form.Item<Ingredient>
                label={"Quantity"}
                name={"quantity"}
                rules={[
                  {
                    required: true,
                    message: "Please insert ingredient quantity",
                  },
                ]}
              >
                <InputNumber placeholder={item.quantity?.toString()} />
              </Form.Item>

              <Form.Item<Ingredient>
                label={"Threshold"}
                name={"threshold"}
                rules={[
                  {
                    required: true,
                    message: "Please insert threshold for ingredient",
                  },
                ]}
              >
                <InputNumber placeholder={item.threshold?.toString()} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Edit
                </Button>
              </Form.Item>
            </Form>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Ingredients;
