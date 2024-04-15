import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  NotificationArgsProps,
  Popconfirm,
  PopconfirmProps,
  Tooltip,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

type Ingredient = {
  id: number;
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

type NotificationPlacement = NotificationArgsProps["placement"];

function Dishes() {
  const [dishes, setDishes] = useState<DishGet[]>([]);
  const [api, contextHolder] = notification.useNotification();

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

  const handleChangeIngredientQuantity = (
    value: number,
    dishIndex: number,
    ingredientIndex: number
  ) => {
    let data = [...dishes];
    data[dishIndex].ingredients[ingredientIndex].quantity = value;
    setDishes(data);
  };

  const handleUpdateQuantity = (dishIndex: number, ingredientIndex: number) => {
    updateQuantity(
      dishes[dishIndex].ingredients[ingredientIndex].quantity,
      dishes[dishIndex].id,
      dishes[dishIndex].ingredients[ingredientIndex].ingredient.id
    );
  };

  const updateQuantity = async (
    newQuantity: number,
    dishId: number,
    ingredientId: number
  ) => {
    const body = {
      quantity: newQuantity,
    };

    fetch(`http://localhost:8080/dish/${dishId}/ingredient/${ingredientId}`, {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        api["success"]({
          message: "Success",
          description:
            "Successully updated ingredient quantity. New quantity: " +
            data.quantity,
        });
      })
      .catch((error) => console.error(error));
  };

  const deleteIngredientFromDish = async (
    dishIndex: number,
    ingredientIndex: number
  ) => {
    const dishId = dishes[dishIndex].id;
    const ingredientId =
      dishes[dishIndex].ingredients[ingredientIndex].ingredient.id;

    fetch(`http://localhost:8080/dish/${dishId}/ingredient/${ingredientId}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    let data = [...dishes];
    data[dishIndex].ingredients.splice(ingredientIndex, 1);
    setDishes(data);
  };

  const confirmDeleteIngredient = (
    dishIndex: number,
    ingredientIndex: number
  ) => {
    deleteIngredientFromDish(dishIndex, ingredientIndex);
    api["success"]({
      message: "Success",
      description: "Successully deleted ingredient from dish.",
    });
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    message.info("No action");
  };

  const openNotification = (data: any, placement: NotificationPlacement) => {
    let message = (
      <div>
        <h3>Successfully updated ingredient</h3>
        <p>Name: {data.name}</p>
        <p>Price: {data.price}</p>
      </div>
    );

    api["success"]({
      message: "Success",
      description: message,
      placement,
    });
  };

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
      .then((data) => openNotification(data, "topRight"))
      .catch((error) => console.error(error));
  };

  return (
    <div style={{ padding: "40px" }}>
      {contextHolder}
      <Typography.Title>Dish list</Typography.Title>

      {dishes.map((dish, index) => {
        return (
          <>
            <Form
              layout="inline"
              style={{ padding: "10px" }}
              colon={false}
              size="large"
            >
              <Form.Item<DishGet>
                label={<Title level={3}>{dish.id}. Name:</Title>}
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
              <ul
                style={{
                  margin: "0",
                  padding: "0",
                  marginTop: "17px",
                  paddingLeft: "10px",
                  paddingTop: "5px",
                  fontSize: "20px",
                  listStyleType: "none",
                }}
              >
                {dish.ingredients?.map((ingredient, i) => {
                  return (
                    <li key={i}>
                      <span style={{ paddingRight: "5px" }}>
                        {ingredient.ingredient.name}:
                      </span>
                      <InputNumber
                        value={ingredient.quantity}
                        style={{ marginTop: "7px" }}
                        onChange={(e) => {
                          if (typeof e === "number") {
                            handleChangeIngredientQuantity(e, index, i);
                          }
                        }}
                      />
                      <Tooltip
                        arrow={false}
                        title={"Apply change in ingredient quantity"}
                      >
                        <Button
                          style={{ marginLeft: "5px", color: "green" }}
                          type="text"
                          onClick={() => handleUpdateQuantity(index, i)}
                        >
                          <CheckCircleOutlined />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        arrow={false}
                        title={"Delete ingredient from dish"}
                      >
                        <Popconfirm
                          title="Delete ingredient"
                          description="Are you sure to delete this ingredient?"
                          onConfirm={() => confirmDeleteIngredient(index, i)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                          icon={
                            <QuestionCircleOutlined style={{ color: "red" }} />
                          }
                        >
                          <Button
                            style={{ marginLeft: "5px", color: "tomato" }}
                            type="text"
                          >
                            <MinusCircleOutlined />
                          </Button>
                        </Popconfirm>
                      </Tooltip>
                    </li>
                  );
                })}
              </ul>

              <Tooltip arrow={false} title={"Apply changes to dish"}>
                <Button
                  type="primary"
                  style={{ marginLeft: "5px", marginTop: "22px" }}
                  onClick={(e) => handleUpdateDish(e, index)}
                >
                  Edit
                </Button>
              </Tooltip>
            </Form>
            <hr style={{ opacity: "50%" }} />
          </>
        );
      })}
    </div>
  );
}

export default Dishes;
