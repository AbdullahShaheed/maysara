import * as customersAPI from "./fakeCustomerService";
import * as productsAPI from "./fakeProductService";

const orders = [
  {
    id: "1",
    date: new Date("Jan 1 2020").toLocaleDateString(),
    customer: { id: "1", name: "أحمد كريم" },
    orderedItems: [
      {
        id: "1",
        name: productsAPI.getProduct("1").name,
        qty: 1,
        price: productsAPI.getProduct("1").price,
        totalPrice: 20,
      },
      {
        id: "6",
        name: productsAPI.getProduct("6").name,
        qty: 2,
        price: productsAPI.getProduct("6").price,
        totalPrice: 13,
      },
    ],
    total: 33,
  },
  {
    id: "2",
    date: new Date("Feb 1 2020").toLocaleDateString(),
    customer: { id: "3", name: "مها سليم" },
    orderedItems: [
      {
        id: "4",
        name: productsAPI.getProduct("4").name,
        qty: 1,
        price: productsAPI.getProduct("4").price,
        totalPrice: 30,
      },
    ],
    total: 30,
  },

  {
    id: "3",
    date: new Date("Feb 15 2020").toLocaleDateString(),
    customer: { id: "5", name: "مروان سمير" },
    orderedItems: [
      {
        id: "9",
        name: productsAPI.getProduct("9").name,
        qty: 1,
        price: productsAPI.getProduct("9").price,
        totalPrice: 65,
      },
      {
        id: "7",
        name: productsAPI.getProduct("7").name,
        qty: 1,
        price: productsAPI.getProduct("7").price,
        totalPrice: 24,
      },
    ],
    total: 89,
  },
];

export function getOrder(id) {
  return orders.find((ord) => ord.id === id);
}

export function getOrders() {
  return orders;
}

//simulate stored procedure for updating the stock
function updateStock(productId, qty) {
  const product = productsAPI.products.find((p) => p.id === productId);
  product.numberInStock -= qty;
}

export function saveOrder(order) {
  const customer = customersAPI.getCustomer(order.customerId);
  order.customer = customer;

  for (let i = 0; i < order.orderedItems.length; i++) {
    //update the stock for each orderedItem
    updateStock(order.orderedItems[i].id, order.orderedItems[i].qty);
  }
  order.id = Date.now().toString();
  orders.push(order);

  return order;
}

export function deleteOrder(id) {
  const orderInDb = orders.find((o) => o.id === id);
  orders.splice(orders.indexOf(orderInDb), 1);

  return orderInDb;
}

export function deleteOrderItem(orderId, orderItem) {
  const orderInDb = orders.find((o) => o.id === orderId);
  const index = orderInDb.orderedItems.indexOf(orderItem);
  orderInDb.orderedItems.splice(index, 1);

  return orderItem;
}
