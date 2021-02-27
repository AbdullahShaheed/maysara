import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Like from "./common/like";

class ProductsTable extends Component {
  columns = [
    { path: "name", label: "إسم المنتوج" },
    { path: "category.name", label: "الفئة" },
    { path: "numberInStock", label: "الكمية المتوفرة" },
    { path: "price", label: "السعر" },
    //---Here in maysara I would like to hide the like column because liked field is not in the mongoDB database
    // {
    //   key: "like",
    //   label: "مرغوب",
    //   content: (product) => (
    //     <Like
    //       liked={product.liked}
    //       onClick={() => this.props.onLike(product)}
    //     ></Like>
    //   ),
    // },
    {
      key: "edit-delete",
      content: (product) => (
        <React.Fragment>
          <Link
            className="btn btn-primary btn-sm ml-2"
            to={`/products/${product._id}`}
          >
            تعديل
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(product)}
          >
            حذف
          </button>
        </React.Fragment>
      ),
    },
  ];
  render() {
    const { products, onSort, sortColumn } = this.props;

    return (
      <table className="table table-bordered table-hover">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        ></TableHeader>
        <TableBody data={products} columns={this.columns}></TableBody>
      </table>
    );
  }
}

export default ProductsTable;
