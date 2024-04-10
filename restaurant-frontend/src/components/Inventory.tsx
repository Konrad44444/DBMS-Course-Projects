import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
  notification,
} from "antd";
import { useEffect, useState } from "react";

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

const postDish = async (body: string) => {
  fetch("http://localhost:8080/dish", {
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

function Inventory() {
  const [api] = notification.useNotification();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [dishForm] = Form.useForm();
  const [ingredientForm] = Form.useForm();
  

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

  const onFinishFailedDish: FormProps<Dish>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishIngredient: FormProps<Ingredient>["onFinish"] = (
    values: Ingredient
  ) => {
    setIngredients([...ingredients, values]);
    let body = JSON.stringify({
      name: values.name,
      price: values.price,
      quantity: values.quantity,
      threshold: values.threshold
    });

    ingredientForm.resetFields();
    openNotification();
    postIngredient(body);
  };

  const onFinishDish: FormProps<Dish>["onFinish"] = (values) => {
    dishForm.resetFields();
    postDish(JSON.stringify(values));
  };

  const openNotification = () => {
    api.info({
      message: `Success`,
      placement: "topRight",
    });
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
      .then(() => openNotification)
      .catch((error) => console.error(error));
  };

  return (
    <div style={{ height: "auto" }}>
      <div
        style={{
          display: "inline-block",
          width: "calc(50% - 20px)",
          padding: "40px",
          margin: "10px",
          height: "auto",
          borderRadius: "10px",
          background: "whitesmoke",
          verticalAlign: "top",
        }}
      >
        <Typography.Title style={{ margin: "10px" }}>
          Add a dish
        </Typography.Title>

        <Form
          form={dishForm}
          name="dish"
          layout="vertical"
          labelCol={{ span: 16 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onFinish={onFinishDish}
          onFinishFailed={onFinishFailedDish}
          autoComplete="yes"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input dish name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price bigger than 0.01!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.List name="ingredients">
            {(
              fields: { [x: string]: any; key: any; name: any }[],
              { add, remove }: any
            ) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      label="Ingredient"
                      {...restField}
                      name={[name, "id"]}
                      rules={[
                        { required: true, message: "Missing ingredient" },
                      ]}
                    >
                      <Select style={{ width: "175px" }}>
                        {ingredients !== undefined &&
                          ingredients.map((ingredient: Ingredient) => (
                            <Select.Option value={ingredient.id}>
                              {ingredient.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Quantity"
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <InputNumber />
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

      <div
        style={{
          display: "inline-block",
          width: "calc(50% - 20px)",
          padding: "40px",
          margin: "10px",
          height: "100%",
          borderRadius: "10px",
          background: "whitesmoke",
          verticalAlign: "top",
        }}
      >
        <Form
          form={ingredientForm}
          name="ingredient"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: false }}
          onFinish={onFinishIngredient}
          onFinishFailed={onFinishFailedIngredient}
          autoComplete="off"
          layout="vertical"
        >
          <Typography.Title style={{ margin: "10px" }}>
            Add a ingredient
          </Typography.Title>

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

          <Form.Item<Ingredient>
            label={"Threshold"}
            name={"threshold"}
            rules={[
              {
                required: true,
                message: "Please insert ingredient threshold",
                // min: 1,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add ingredient
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Inventory;
