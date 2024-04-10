import { Typography, List, Form, InputNumber, Input, Button, FormProps } from "antd";
import { useState, useEffect } from "react";

type Ingredient = {
    id?: number;
    name?: string;
    price?: number;
    quantity?: number;
    threshold?: number;
};

type Dish = {
    id?: number;
    name?: string;
    price?: number;
    ingredients?: number[];
};
  
type DishGet = {
    id?: number;
    name?: string;
    price?: number;
    ingredients?: [{ ingredient: Ingredient; quantity: number }];
};

const updateDish = async (body: string, id: string) => {
    fetch("http://localhost:8080/dish/" + id, {
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

function Dishes() {

    const [dishes, setDishes] = useState<DishGet[]>([]);

    useEffect(() => {
      fetch("http://localhost:8080/dish", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
            setDishes(data);
        })
        .catch((error) => console.log(error));
    }, []);

    const onFinishFailedDish: FormProps<Dish>["onFinishFailed"] = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
      };

    const onFinishDish: FormProps<Dish>["onFinish"] = (values) => {
        let body = JSON.stringify({
            name: values.name,
            price: values.price
          });
        updateDish(body, values.id?.toString() as string);
      };

    return (
    <div style={{padding: "40px"}}>
      <Typography.Title>Dish list</Typography.Title>

      <List
        style={{ marginTop: "10px" }}
        grid={{ gutter: 16, column: 1 }}
        dataSource={dishes}
        renderItem={(item: DishGet) => (
          <List.Item>
            <Form
              name="dish"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: false }}
              onFinish={onFinishDish}
              onFinishFailed={onFinishFailedDish}
              autoComplete="off"
              layout="inline"
            >
              <Typography.Title style={{ margin: "10px" }}>
                {item.name}
              </Typography.Title>

              <Form.Item<DishGet>
                label={"Id"}
                name={"id"}
              >
                <InputNumber placeholder={item.id?.toString()} disabled/>
              </Form.Item>

              <Form.Item<DishGet>
                label={"Name"}
                name={"name"}
                rules={[
                  { required: true, message: "Please insert dish name" },
                ]}
              >
                <Input placeholder={item.name} />
              </Form.Item>

              <Form.Item<DishGet>
                label={"Price"}
                name={"price"}
                rules={[
                  {
                    required: true,
                    message: "Please insert dish price",
                  },
                ]}
              >
                <InputNumber placeholder={item.price?.toString()} />
              </Form.Item>

              <List
                style={{ marginTop: "10px" }}
                grid={{ gutter: 16, column: 1 }}
                dataSource={item.ingredients as [{ ingredient: Ingredient; quantity: number }]}
                renderItem={(ingredient) => (
                    <List.Item>

                        {ingredient.ingredient.name}: {ingredient.quantity} pcs

                    </List.Item>
                )}
              />

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
    )

}

export default Dishes;