import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class OrdersTable extends Component {
  columns = [
    { path: "id", label: "الرقم" },
    { path: "date", label: "التاريخ" },
    { path: "customer.name", label: "الزبون" },
    {
      path: "orderedItems",
      label: "المواد",
      content: (order) => (
        <ul>
          {order.orderedItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ),
    },
    { path: "total", label: "إجمالي الفاتورة" },
    {
      key: "preview",
      content: (order) => (
        <Link
          className="btn btn-primary btn-sm ml-2"
          to={`/orders/preview/${order.id}`}
        >
          معاينة
        </Link>
      ),
    },
  ];
  render() {
    const { orders, onSort, sortColumn } = this.props;

    return (
      <table className="table table-bordered table-hover">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={orders} columns={this.columns} />
      </table>
    );
  }
}

export default OrdersTable;
