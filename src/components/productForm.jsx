import React from "react";
import Joi from "joi-browser";
// import { getCategories } from "./../services/fakeCategoryService";
import { getCategories } from "./../services/categoryService";
// import { getProduct } from "./../services/fakeProductService";
import { getProduct } from "./../services/productService";
// import { saveProduct } from "./../services/fakeProductService";
import { saveProduct } from "./../services/productService";
import Form from "./common/form";
import Input from "./common/input";
import Select from "./common/select";

class ProductForm extends Form {
  state = {
    data: {
      name: "",
      categoryId: "",
      numberInStock: "",
      price: "",
    },
    categories: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .error(() => {
        return { message: "إسم المنتوج مطلوب" };
      }),
    categoryId: Joi.string()
      .required()
      .error(() => {
        return { message: "مطلوب تحديد فئة المنتوج" };
      }),
    numberInStock: Joi.number()
      .error(() => {
        return { message: "الرجاء إدخال رقم" };
      })
      .min(1)
      .max(100)
      .error(() => {
        return { message: "يجب إدخال كمية بين 1 و 100" };
      }),
    price: Joi.number()
      .required()
      .error(() => {
        return { message: "الرجاء إدخال رقم" };
      }),
  };

  async populateWithCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }
  async populateWithProduct() {
    try {
      const productId = this.props.match.params.id;
      if (productId === "new") return;

      const { data: product } = await getProduct(productId);
      this.setState({ data: this.mapToViewModel(product) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateWithCategories();
    await this.populateWithProduct();
  }
  mapToViewModel(product) {
    return {
      _id: product._id,
      name: product.name,
      categoryId: product.category._id,
      numberInStock: product.numberInStock,
      price: product.price,
    };
  }

  doSubmit = async () => {
    await saveProduct(this.state.data);
    this.props.history.push("/products");
  };

  render() {
    const { data, categories, errors } = this.state;

    return (
      <div className="col-5">
        <h3>نموذج إدخال أو تحديث منتوج</h3>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="name"
            label="إسم المنتوج"
            value={data.name}
            error={errors.name}
            onChange={this.handleChange}
          />
          <Select
            name="categoryId"
            label="فئة المنتوج"
            value={data.categoryId}
            options={categories}
            error={errors.categoryId}
            onChange={this.handleChange}
          />
          <Input
            name="numberInStock"
            label="الكمية المتوفرة"
            value={data.numberInStock}
            error={errors.numberInStock}
            onChange={this.handleChange}
          />
          <Input
            name="price"
            label="السعر"
            value={data.price}
            error={errors.price}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">حفظ</button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
