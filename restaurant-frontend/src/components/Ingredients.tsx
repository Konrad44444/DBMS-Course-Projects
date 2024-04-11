import {
  Button,
  Form,
  Input,
  InputNumber,
  Typography
} from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

type Ingredient = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  threshold: number;
};

interface UpdateIngredient {
  name: string;
  price: number;
  quantity: number;
  threshold: number;
}

const updateIngredient = async (body: UpdateIngredient, id: number) => {
  fetch(`http://localhost:8080/ingredient/${id}`, {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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

  const handleChangeIngredientName = (value: string, index: number) => {
    let data = [...ingredients];
    data[index].name = value;
    setIngredients(data);
  };

  const handleChangeIngredientPrice = (value: number, index: number) => {
    let data = [...ingredients];
    data[index].price = Number(value);
    setIngredients(data);
  };

  const handleChangeIngredientQuantity = (value: number, index: number) => {
    let data = [...ingredients];
    data[index].quantity = Number(value);
    setIngredients(data);
  };

  const handleChangeIngredientThreshold = (value: number, index: number) => {
    let data = [...ingredients];
    data[index].threshold = Number(value);
    setIngredients(data);
  };

  const handleEditIngredient = (e: any, index: number) => {
    e.preventDefault();
    
    const object: Ingredient = ingredients[index];

    const body: UpdateIngredient = {
      name: object.name,
      price: object.price,
      quantity: object.quantity,
      threshold: object.threshold
    }

    updateIngredient(body, object.id);
  };

  return (
    <div style={{ padding: "40px" }}>
      <Typography.Title>Ingredient list</Typography.Title>

      {ingredients.map((ingredient, index) => {
        return (
          <>
          <Form
            layout="inline"
            style={{ padding: "10px", verticalAlign: "center" }}
            colon={false}
            size="large"
          >
            <Form.Item<Ingredient>
              label={<Title level={3}>{ingredient.id}. Name:</Title>}
              style={{ paddingTop: "22px" }}
            >
              <Input
                value={ingredients[index].name}
                onChange={(e) =>
                  handleChangeIngredientName(e.target.value, index)
                }
              />
            </Form.Item>

            <Form.Item<Ingredient>
              label={<Title level={3}>Price:</Title>}
              style={{ paddingTop: "22px" }}
            >
              <InputNumber
                value={ingredients[index].price}
                onChange={(e) => {
                  if (typeof e === "number") {
                    handleChangeIngredientPrice(e, index);
                  }
                }}
              />
            </Form.Item>

            <Form.Item<Ingredient>
              label={<Title level={3}>Quantity:</Title>}
              style={{ paddingTop: "22px" }}
            >
              <InputNumber
                value={ingredients[index].quantity}
                onChange={(e) => {
                  if (typeof e === "number") {
                    handleChangeIngredientQuantity(e, index);
                  }
                }}
              />
            </Form.Item>

            <Form.Item<Ingredient>
              label={<Title level={3}>Threshold:</Title>}
              style={{ paddingTop: "22px" }}
            >
              <InputNumber
                value={ingredients[index].threshold}
                onChange={(e) => {
                  if (typeof e === "number") {
                    handleChangeIngredientThreshold(e, index);
                  }
                }}
              />
            </Form.Item>

            <Button
              type="primary"
              style={{ marginTop: "22px" }}
              onClick={(e) => handleEditIngredient(e, index)}
            >
              Edit
            </Button>
          </Form>
          <hr style={{opacity: "50%"}} />
          </>
        );
      })}

    </div>
  );
}

export default Ingredients;
