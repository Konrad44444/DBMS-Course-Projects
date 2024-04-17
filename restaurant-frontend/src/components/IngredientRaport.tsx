import { DatePicker, Table, TableProps, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

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
          id: number;
          name: string;
          price: number;
        };
        quantity: number;
      }
    ];
}

interface Ingredient {
    id: number;
    name: string;
    price: number;
    quantity: number;
    threshold: number;
  };

interface Dish {
    id: number;
    name: string;
    price: number;
    ingredients: [{ ingredient: Ingredient; quantity: number }];
  };

interface IngredientRaport {
    id: number;
    name: string;
    quantity: number;
    amount: number;
}

const ingredientColumns: TableProps<IngredientRaport>["columns"] = [
  {
    title: "Ingredient Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Total Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

function IngredientRaport() {

    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
    const [allDishes, setAllDishes] = useState<Dish[]>([])
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [ingredientRaport, setIngredientRaport] = useState<IngredientRaport[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
    fetch("http://localhost:8080/order", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let d: Order[] = [];
        data.map((order: Order) => {
          d.push(order);
        });
        setAllOrders(d);
      })
      .catch((error) => console.log(error));

      fetch("http://localhost:8080/ingredient", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAllIngredients(data);
      })
      .catch((error) => console.log(error));

        fetch("http://localhost:8080/dish", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setAllDishes(data);
          })
          .catch((error) => console.log(error));

        onDateChange(["",""],["",""])
    }, []);

    const onDateChange = (date: string[], dateString: string | string[]) => {
        let ordersRange = (dateString !== "") ? 
            allOrders.filter((element) => element.date.substring(0, 7) >= dateString && element.date.substring(0, 7) <= dateString) :
            allOrders;

        let ingredients: IngredientRaport[] = [];

        for(let i=0; i<ordersRange.length; i++) {

            ordersRange[i].dishes.forEach((element) => {
                let dish = allDishes.find((elementInside) => elementInside.id === element.dish.id);
                dish?.ingredients.forEach((elementInside) => {
                    let ingredient = ingredients.find((elementInside2) => elementInside2.id === elementInside.ingredient.id);
                    let ingredient2 = allIngredients.find((elementInside2) => elementInside2.id === elementInside.ingredient.id);
                    if(ingredient === undefined) {
                        let inputIngredient: IngredientRaport = {
                            id: elementInside.ingredient.id,
                            name: elementInside.ingredient.name,
                            quantity: element.quantity * elementInside.quantity,
                            amount: element.quantity * elementInside.quantity * ((ingredient2 !== undefined) ? ingredient2?.price : 0)
                        }
                        ingredients.push(inputIngredient);
                    }
                    else {
                        let index = ingredients.indexOf(ingredient);
                        ingredients[index].quantity += element.quantity * elementInside.quantity;
                        ingredients[index].amount += element.quantity * elementInside.quantity * ((ingredient2 !== undefined) ? ingredient2?.price : 0);
                    }
                })
            })

        }

        if(ingredients.length === 0) {
          setTotalAmount(0);
        }
        else {
          setTotalAmount(ingredients.reduce((accumulator: number, currentValue: IngredientRaport) => {
            return accumulator + currentValue.amount;
          }, 0));
        }
        setIngredientRaport(ingredients);

    }

    return (
      <div style={{ padding: "40px" }}>

        <Title level={2}>Ingredient Sales</Title>
        <div style={{margin: "20px", justifyContent: "center", alignContent: "center", textAlign: "center"}}>
          <Title level={5}>Pick month</Title>
          <DatePicker onChange={onDateChange} picker="month"/>
        </div>
        <Table columns={ingredientColumns} dataSource={ingredientRaport} />

        <Typography.Title level={5}>Total amount in time period: {totalAmount} PLN</Typography.Title>

      </div>
    )

}

export default IngredientRaport;