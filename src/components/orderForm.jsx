import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
// import { getCustomers } from "./../services/fakeCustomerService";
// import { saveOrder } from "./../services/fakeOrderService";
// import { getProducts, getProduct } from "./../services/fakeProductService";
import { getCustomers } from "./../services/customerService";
import { saveOrder } from "./../services/orderService";
import { getProducts, getProduct } from "./../services/productService";
import Form from "./common/form";
import Input from "./common/input";
import Select from "./common/select";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import AutoCompleteBox from "./common/autoCompleteBox";

class OrderForm extends Form {
  state = {
    data: {
      date: "",
      customerId: "",
      items: [],
      total: "",
    },
    customers: [],
    products: [],
    errors: {},

    searchQuery: "",
    insufficientQty: false,
  };

  itemsColumns = [
    { path: "name", label: "المادة" },
    {
      path: "qty",
      label: "الكمية المطلوبة",
      content: (item) => (
        <input
          className="form-control"
          type="number"
          min={1}
          max={100}
          value={item.qty}
          onChange={(e) => this.handleQtyChange(e, item)}
        />
      ),
    },
    { path: "price", label: "السعر" },
    {
      path: "totalPrice",
      label: "السعر الكلي",
    },
    {
      key: "delete-item",
      label: "",
      content: (item) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.handleDelete(item.productId)}
        >
          X
        </button>
      ),
    },
  ];

  schema = {
    _id: Joi.string(),
    date: Joi.date()
      .required()
      .error(() => {
        return { message: "مطلوب تحديد التاريخ" };
      }),
    customerId: Joi.string()
      .required()
      .error(() => {
        return { message: "مطلوب تحديد زبون" };
      }),
    items: Joi.array(),
    total: Joi.number(),
  };
  /*
  // handleProductSelect = (e) => {
  //   const productId = e.currentTarget.value;
  //   const product = getProduct(productId);
  //   const order = this.state.data;
  //   const orderItem = {
  //     id: product.id,
  //     name: product.name,
  //     qty: 1, //initial value
  //     price: product.price,
  //     totalPrice: product.price, //initial value
  //   };
  //   order.orderedItems.push(orderItem);
  //   order.total = this.calculateTotal();

  //   this.setState({ data: order });
  // }; */

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    const { data: products } = await getProducts();
    this.setState({ customers, products });
  }

  handleProductSelect = (product) => {
    const order = this.state.data;
    const item = {
      productId: product._id,
      name: product.name,
      qty: 1,
      price: product.price,
      totalPrice: product.price,
    };
    order.items.push(item);
    order.total = this.calculateTotal();

    this.setState({ data: order });
  };

  handleQtyChange = async (e, item) => {
    const order = { ...this.state.data };
    const items = order.items;

    const index = items.indexOf(item);
    items[index] = { ...item };

    const qty = parseInt(e.currentTarget.value, 10);

    const stock = await getProduct(item.productId).numberInStock;

    if (qty > stock) {
      toast(`الرصيد غير كافي. الكمية المتوفرة:  ${stock}`);
      return;
    }

    items[index].qty = qty;
    items[index].totalPrice = qty * items[index].price;

    order.total = this.calculateTotal();

    this.setState({ data: order });
  };

  doSubmit = async () => {
    const { data: order } = await saveOrder(this.state.data);
    if (!order._id) {
      toast.error("هناك خطأ أدى لفشل حفظ الفاتورة");
      return;
    }
    toast.success("تم حفظ الفاتورة بنجاح");
    this.props.history.push("/orders");
  };

  handleDelete = (id) => {
    const order = this.state.data;
    const items = [...order.items];
    order.items = items.filter((item) => item.productId !== id);
    order.total = this.calculateTotal();

    this.setState({ data: order });
  };

  calculateTotal() {
    let sum = 0;
    for (let item of this.state.data.items) sum += item.totalPrice.valueOf();
    return sum;
  }
  render() {
    const { data, customers, products, errors, searchQuery } = this.state;
    return (
      <div>
        <h3>نموذج إدخال أو تحديث فاتورة </h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-4">
              <Input
                name="date"
                label="التاريخ"
                value={data.date}
                error={errors.date}
                onChange={this.handleChange}
              />
              <Select
                name="customerId"
                label="الزبون"
                value={data.customerId}
                options={customers}
                error={errors.customerId}
                onChange={this.handleChange}
              />
              <AutoCompleteBox
                items={products}
                onItemSelect={this.handleProductSelect}
              />
            </div>
          </div>

          <table className="table table-bordered">
            <TableHeader
              columns={this.itemsColumns}
              sortColumn={{ path: "" }}
              onSort={() => null}
            />
            <TableBody data={data.items} columns={this.itemsColumns} />
          </table>
          <p
            style={{ textAlign: "left", fontWeight: "bold" }}
          >{`المجموع الكلي:  ${data.total}`}</p>
          <button className="btn btn-primary">حفظ</button>
        </form>
      </div>
    );
  }
}

export default OrderForm;
