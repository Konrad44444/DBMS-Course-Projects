import { Table, TableProps, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

interface Ingredient {
  id: number;
  name: string;
  price: number;
  quantity: number;
  threshold: number;
}

interface Order {
  id: number;
  totalAmount: number;
  date: string;
  customerId: 1;
  customer: {
    id: number;
    name: string;
    email: string;
  };
  dishes: [
    {
      dish: {
        name: string;
        price: number;
      };
      quantity: number;
    }
  ];
}

const ingredientsColumns: TableProps<Ingredient>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (_, record) => (
      <Typography style={{ color: "red", fontWeight: "bold" }}>
        {record.quantity}
      </Typography>
    ),
  },
  {
    title: "Threshold",
    dataIndex: "threshold",
    key: "threshold",
    render: (_, record) => (
      <Typography style={{ color: "cornflowerBlue", fontWeight: "bold" }}>
        {record.threshold}
      </Typography>
    ),
  },
  {
    render: () => <Tag color={"red"}>{"ACTION REQUIRED"}</Tag>,
  },
];

const orderColumns: TableProps<Order>["columns"] = [
  {
    title: "Customer Name",
    key: "customerName",
    render: (_, record) => <Typography>{record.customer.name}</Typography>,
  },
  {
    title: "Customer Email",
    key: "customerEmail",
    render: (_, record) => <Typography>{record.customer.email}</Typography>,
  },
  {
    title: "Date",
    key: "date",
    render: (_, record) => <Typography>{record.date.split("T")[0]}</Typography>,
  },
  {
    title: "Total amount",
    dataIndex: "totalAmount",
    key: "totalAmount",
  },
  {
    title: "Dishes",
    key: "dishes",
    render: (_, record) => (
      <>
        {record.dishes.map((dish, index) => {
          return (
            <Typography key={index}>
              {dish.dish.name} - {dish.quantity}
            </Typography>
          );
        })}
      </>
    ),
  },
];

function Dashboard() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/ingredient", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let d: Ingredient[] = [];
        data.map((ingredient: Ingredient) => {
          if (ingredient.quantity <= ingredient.threshold) {
            d.push(ingredient);
          }
        });
        setIngredients(d);
      })
      .catch((error) => console.log(error));

    fetch("http://localhost:8080/order", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let d: Order[] = [];
        const date = new Date();
        const currentDate: string = date.toISOString().split("T")[0];
        data.map((order: Order) => {
          const orderDate: string = order.date.split("T")[0];

          if (orderDate === currentDate) {
            d.push(order);
          }
        });
        setOrders(d);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <Title level={2}>Ingredients below threshold</Title>
      <Table columns={ingredientsColumns} dataSource={ingredients} />

      <hr style={{ opacity: "50%" }} />

      <Title level={2}>Today's orders</Title>
      <Table columns={orderColumns} dataSource={orders} />
    </div>
  );
}

export default Dashboard;
