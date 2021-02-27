import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../services/authService";
// import { getProducts } from "./../services/fakeProductService";
// import { getCategories } from "./../services/fakeCategoryService";
import { getProducts, deleteProduct } from "./../services/productService";
import { getCategories } from "./../services/categoryService";
import ProductsTable from "./productsTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "./../utils/paginate";
import SearchBox from "./common/searchBox";
import Select from "./common/select";
import ConfirmationBox from "./common/confirmationBox";

class Products extends Component {
  state = {
    products: [],
    categories: [],
    pageSize: 4,
    pageSizes: [
      { id: 3, name: "3" },
      { id: 4, name: "4" },
      { id: 5, name: "5" },
      { id: 6, name: "الكل" },
    ],
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
    selectedCategory: null,
    searchQuery: "",
    modalVisible: false,
    productToDelete: null,
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    const { data } = await getCategories();
    const categories = [...data, { _id: "", name: "الكل" }];

    const selectedCategory = categories[categories.length - 1];

    this.setState({ products, categories, selectedCategory });
  }

  handleDelete = (product) => {
    if (!auth.getCurrentUser() || !auth.getCurrentUser().isAdmin)
      return toast("فقط المستخدم الأدمن يستطيع الحذف");

    this.setState({ productToDelete: product });
    this.toggleModal();
  };

  doDelete = async () => {
    const originalProducts = this.state.products;
    const products = originalProducts.filter(
      (p) => p._id !== this.state.productToDelete._id
    );
    this.setState({ products });

    try {
      await deleteProduct(this.state.productToDelete._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This product has been already deleted.");

      this.setState({ products: originalProducts });
    }
    this.toggleModal();
  };

  toggleModal = () => {
    const visible = this.state.modalVisible;
    this.setState({ modalVisible: !visible });
  };

  handleLike = (product) => {
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...product }; //clone it before changing it
    products[index].liked = !product.liked;

    this.setState({ products });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePageSizeChange = (e) => {
    let pageSize = 0;
    const pageSizes = [...this.state.pageSizes];

    if (e.currentTarget.value === "6") {
      pageSize = this.state.products.length;
      const lastItem = { ...pageSizes[3] };
      lastItem.id = pageSize;
      pageSizes[3] = lastItem;
    } else pageSize = parseInt(e.currentTarget.value);

    this.setState({ pageSize, pageSizes });
  };

  handleCategorySelect = (category) => {
    this.setState({
      selectedCategory: category,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedCategory: null,
      currentPage: 1,
    });
  };

  getPagedData() {
    const {
      products: allProducts,
      selectedCategory,
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
    } = this.state;

    //filter -> sort -> paginate
    let filtered = allProducts;
    if (searchQuery)
      filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else {
      filtered =
        selectedCategory && selectedCategory._id
          ? allProducts.filter((p) => p.category._id === selectedCategory._id)
          : allProducts;
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const data = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, products: data };
    //Note we did not set the state with new filtered array,
    //we just return the new filtered array to render the table with its items
  }

  render() {
    const {
      currentPage,
      pageSize,
      pageSizes,
      categories,
      selectedCategory,
      sortColumn,
      searchQuery,
      modalVisible,
    } = this.state;

    const { totalCount, products } = this.getPagedData();

    return (
      <>
        <div className="row">
          <div className="col-3">
            <p>هناك {totalCount} منتوجات من هذه الفئة</p>
          </div>
          <div className="col-2">
            <Link to="/products/new" className="btn btn-primary mb-2">
              إضافة منتوج جديد
            </Link>
          </div>
          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={categories}
              selectedItem={selectedCategory}
              onItemSelect={this.handleCategorySelect}
            ></ListGroup>
          </div>
          <div className="col">
            <ProductsTable
              products={products}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            ></ProductsTable>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-3"></div>
          <div className="col-9">
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            ></Pagination>
            <span className="mr-3 ml-2">عدد السجلات</span>
            <Select
              options={pageSizes}
              value={pageSize}
              onChange={this.handlePageSizeChange}
              style={{ display: "inline-block" }}
            />
          </div>
        </div>
        <ConfirmationBox
          onConfirm={this.doDelete}
          onCancel={this.toggleModal}
          visisble={modalVisible}
        />
      </>
    );
  }
}

export default Products;
