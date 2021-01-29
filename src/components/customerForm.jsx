import React from "react";
import Joi from "joi-browser";
import { getCustomer, saveCustomer } from "./../services/fakeCustomerService";
import Form from "./common/form";
import Input from "./common/input";

class CustomerForm extends Form {
  state = {
    data: {
      name: "",
      address: "",
    },
    errors: {},
  };

  schema = {
    id: Joi.string(),
    name: Joi.string()
      .required()
      .error(() => {
        return { message: "إسم الزبون مطلوب" };
      }),
    address: Joi.string(),
  };

  componentDidMount() {
    const customerId = this.props.match.params.id;
    if (customerId === "new") return;

    const customer = getCustomer(customerId);
    if (!customer) return this.props.history.replace("/customers");

    this.setState({ data: this.mapToViewModel(customer) });
  }

  mapToViewModel = (customer) => {
    return {
      id: customer.id,
      name: customer.name,
      address: customer.address,
    };
  };

  doSubmit() {
    saveCustomer(this.state.data);
    this.props.history.push("/customers");
  }

  render() {
    const { data, errors } = this.state;
    return (
      <div className="col-5">
        <h3>نموذج إدخال أو تحديث زبون</h3>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="name"
            label="الإسم"
            value={data.name}
            error={errors.name}
            onChange={this.handleChange}
          />

          <Input
            name="address"
            label="العنوان"
            value={data.address}
            error={errors.address}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">حفظ</button>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
