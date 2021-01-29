import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import {
  getCustomers,
  deleteCustomer,
} from "./../services/fakeCustomerService";
import { paginate } from "./../utils/paginate";
import Pagination from "./common/pagination";
import CustomersTable from "./customersTable";
import ConfirmationBox from "./common/confirmationBox";

class Customers extends Component {
  state = {
    customers: [],
    pageSize: 5,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
    modalVisible: false,
    customerToDelete: null,
  };

  componentDidMount() {
    this.setState({ customers: getCustomers() });
  }

  handleDelete = (customer) => {
    this.setState({ customerToDelete: customer });
    this.toggleModal();
  };

  doDelete = () => {
    //--deleting from UI only
    // const customers = this.state.customers.filter((p) => p.id !== id);
    // this.setState({ customers });

    //--deleting from the immaginary db not only from UI
    deleteCustomer(this.state.customerToDelete.id);
    this.componentDidMount();
    this.toggleModal();
  };

  toggleModal = () => {
    const visible = this.state.modalVisible;
    this.setState({ modalVisible: !visible });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData() {
    const { customers, currentPage, pageSize, sortColumn } = this.state;
    const sorted = _.orderBy(customers, [sortColumn.path], [sortColumn.order]);
    const data = paginate(sorted, currentPage, pageSize);

    return { totalCount: sorted.length, customers: data };
  }

  render() {
    const { currentPage, pageSize, sortColumn } = this.state;
    const { totalCount, customers } = this.getPagedData();

    if (totalCount === 0) return <p>لا يوجد زبائن في قاعدة البيانات</p>;
    return (
      <>
        <p>يظهر {totalCount} من الزبائن في قاعدة البيانات</p>

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        ></Pagination>
        <CustomersTable
          customers={customers}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        ></CustomersTable>
        <Link to="/customers/new" className="btn btn-primary mb-2">
          إضافة زبون جديد
        </Link>

        <ConfirmationBox
          onConfirm={this.doDelete}
          onCancel={this.toggleModal}
          visisble={this.state.modalVisible}
        />
      </>
    );
  }
}

export default Customers;
