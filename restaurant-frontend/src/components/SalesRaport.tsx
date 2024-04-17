import { DatePicker, Table, TableProps, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

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
    title: "Order Id",
    dataIndex: "id",
    key: "orderId",
  },
];

const { RangePicker } = DatePicker;

function SalesRaport() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [allOrders, setAllOrders] = useState<Order[]>([]);
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
        setOrders(d);
        setTotalAmount(d.reduce((accumulator: number, currentValue: Order) => {
          return accumulator + currentValue.totalAmount;
        }, 0));
      })
      .catch((error) => console.log(error));
    }, []);

    const onDateChange = (dates: [any, any], dateStrings: [string, string]) => {

      if(dateStrings[0] === "") {
        setOrders(allOrders);
        setTotalAmount(allOrders.reduce((accumulator: number, currentValue: Order) => {
          return accumulator + currentValue.totalAmount;
        }, 0))
      }
      else {
        let ordersRange = allOrders.filter((element) => element.date.substring(0, 10) >= dateStrings[0] && element.date.substring(0, 10) <= dateStrings[1]);
        setOrders(ordersRange);
        setTotalAmount(ordersRange.reduce((accumulator: number, currentValue: Order) => {
          return accumulator + currentValue.totalAmount;
        }, 0))
      }

    }

    return (
      <div style={{ padding: "40px" }}>

        <Title level={2}>Orders</Title>
        <div style={{margin: "20px", justifyContent: "center", alignContent: "center", textAlign: "center"}}>
          <Title level={5}>Pick date range</Title>
          <RangePicker onChange={onDateChange}/>
        </div>
        <Table columns={orderColumns} dataSource={orders} expandable={{
          expandedRowRender: (record) => <table style={{textAlign: "left", width: "40%"}}>
              <tr>
                <th>Dish name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            {record.dishes.map((dish) => {
            return(
              <tr>
                <td>{dish.dish.name}</td>
                <td>{dish.quantity} pcs</td>
                <td>{dish.quantity * dish.dish.price} zł</td>
              </tr>
            );
            })}
          </table>,
        }}/>

        <Typography.Title level={5}>Total amount in time period: {totalAmount} PLN</Typography.Title>

      </div>
    )

}

export default SalesRaport;