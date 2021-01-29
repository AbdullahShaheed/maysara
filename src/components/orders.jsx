import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getOrders } from "./../services/fakeOrderService";
import { paginate } from "./../utils/paginate";
import Pagination from "./common/pagination";
import OrdersTable from "./ordersTable";

class Orders extends Component {
  state = {
    orders: [],
    pageSize: 3,
    currentPage: 1,
    sortColumn: { path: "date", order: "asc" },
  };

  componentDidMount() {
    this.setState({ orders: getOrders() });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData() {
    const { orders, currentPage, pageSize, sortColumn } = this.state;
    const sorted = _.orderBy(orders, [sortColumn.path], [sortColumn.order]);
    const data = paginate(sorted, currentPage, pageSize);

    return { totalCount: sorted.length, orders: data };
  }

  render() {
    const { currentPage, pageSize, sortColumn } = this.state;
    const { totalCount, orders } = this.getPagedData();

    if (totalCount === 0) return <p>لا يوجد فواتير في قاعدة البيانات</p>;
    return (
      <React.Fragment>
        <p>يظهر {totalCount} من الفواتير في قاعدة البيانات</p>

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        ></Pagination>
        <OrdersTable
          orders={orders}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        ></OrdersTable>
        <Link to="/orders/new" className="btn btn-primary mb-2">
          إضافة فاتورة جديدة
        </Link>
      </React.Fragment>
    );
  }
}

export default Orders;
