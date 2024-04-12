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

const columns: TableProps<Ingredient>["columns"] = [
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
  },
  {
    render: () => <Tag color={"volcano"}>{"ACTION REQUIRED"}</Tag>,
  },
];

function Dashboard() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/ingredient", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        data.map((ingredient: Ingredient) => {
          if (ingredient.quantity <= ingredient.threshold) {
            setIngredients([...ingredients, ingredient]);
          }
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <Title level={2}>Ingredients below threshold</Title>
      <Table columns={columns} dataSource={ingredients} />
    </div>
  );
}

export default Dashboard;
