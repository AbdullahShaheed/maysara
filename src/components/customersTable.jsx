import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class CustomersTable extends Component {
  columns = [
    { path: "name", label: "الاسم" },
    { path: "phone", label: "رقم الهاتف" },
    { path: "address", label: "العنوان" },
    {
      key: "edit-delete",
      content: (customer) => (
        <React.Fragment>
          <Link
            className="btn btn-primary btn-sm ml-2"
            to={`/customers/${customer._id}`}
          >
            تعديل
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(customer)}
          >
            حذف
          </button>
        </React.Fragment>
      ),
    },
  ];
  render() {
    const { customers, onSort, sortColumn } = this.props;

    return (
      <table className="table table-bordered table-hover">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={customers} columns={this.columns} />
      </table>
    );
  }
}

export default CustomersTable;
