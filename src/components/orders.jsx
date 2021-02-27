import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
// import { getOrders } from "./../services/fakeOrderService";
import { getOrders } from "./../services/orderService";
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

  async componentDidMount() {
    const { data: orders } = await getOrders();
    this.setState({ orders });
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

    return (
      <>
        <p>يظهر {totalCount} من الفواتير في قاعدة البيانات</p>

        <Link to="/orders/new" className="btn btn-primary mb-2">
          إضافة فاتورة جديدة
        </Link>

        <OrdersTable
          orders={orders}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        />

        <div className="row">
          <div className="col">
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Orders;
