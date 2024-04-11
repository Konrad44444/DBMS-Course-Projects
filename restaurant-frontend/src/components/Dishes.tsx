import { Button, Form, Input, InputNumber, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

type Ingredient = {
  id?: number;
  name?: string;
  price?: number;
  quantity?: number;
  threshold?: number;
};

type DishGet = {
  id: number;
  name: string;
  price: number;
  ingredients: [{ ingredient: Ingredient; quantity: number }];
};

interface UpdateDish {
  name: string;
  price: number;
}

const updateDish = async (body: UpdateDish, id: number) => {
  fetch(`http://localhost:8080/dish/${id}`, {
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

  const handleChangeDishName = (value: string, index: number) => {
    let data = [...dishes];
    data[index].name = value;
    setDishes(data);
  };

  const handleChangeDishPrice = (value: number, index: number) => {
    let data = [...dishes];
    data[index].price = value;
    setDishes(data);
  };

  const handleUpdateDish = (e: any, index: number) => {
    e.preventDefault();

    const object: DishGet = dishes[index];

    const body: UpdateDish = {
      name: object.name,
      price: object.price,
    };

    updateDish(body, object.id);
  };

  return (
    <div style={{ padding: "40px" }}>
      <Typography.Title>Dish list</Typography.Title>

      {dishes.map((dish, index) => {
        return (
          <Form layout="inline" style={{ padding: "10px" }} colon={false} size="large">
            <Form.Item<DishGet>
              label={<Title level={3}>Name:</Title>}
              style={{ paddingTop: "22px" }}
            >
              <Input
                value={dishes[index].name}
                onChange={(e) => handleChangeDishName(e.target.value, index)}
              />
            </Form.Item>

            <Form.Item<DishGet>
              label={<Title level={3}>Price:</Title>}
              style={{ paddingTop: "22px" }}
            >
              <InputNumber
                value={dishes[index].price}
                onChange={(e) => {
                  if (typeof e === "number") {
                    handleChangeDishPrice(e, index);
                  }
                }}
              />
            </Form.Item>

            <Title level={3}>Ingredients:</Title>
            <ul style={{ paddingTop: "5px", fontSize: "20px" }}>
              {dish.ingredients?.map((ingredient, index) => {
                return (
                  <li key={index}>
                    {ingredient.ingredient.name}: {ingredient.quantity}pcs
                  </li>
                );
              })}
            </ul>

            <Button
              type="primary"
              style={{ marginLeft: "20px", marginTop: "22px" }}
              onClick={(e) => handleUpdateDish(e, index)}
            >
              Edit
            </Button>
          </Form>
        );
      })}
    </div>
  );
}

export default Dishes;
