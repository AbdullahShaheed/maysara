import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import {
//   getCustomers,
//   deleteCustomer,
// } from "./../services/fakeCustomerService";
import { getCustomers, deleteCustomer } from "./../services/customerService";
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

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  handleDelete = (customer) => {
    this.setState({ customerToDelete: customer });
    this.toggleModal();
  };

  doDelete = async () => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter(
      (c) => c._id !== this.state.customerToDelete._id
    );
    this.setState({ customers });

    try {
      await deleteCustomer(this.state.customerToDelete._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast("This customer has been already deleted.");

      this.setState({ customers: originalCustomers });
    }

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

    return (
      <>
        <p>يظهر {totalCount} من الزبائن في قاعدة البيانات</p>

        <Link to="/customers/new" className="btn btn-primary mb-2">
          إضافة زبون جديد
        </Link>

        <CustomersTable
          customers={customers}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        ></CustomersTable>

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        ></Pagination>
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
