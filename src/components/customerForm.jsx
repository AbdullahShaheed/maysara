import React from "react";
import Joi from "joi-browser";
// import { getCustomer, saveCustomer } from "./../services/fakeCustomerService";
import { getCustomer, saveCustomer } from "./../services/customerService";
import Form from "./common/form";
import Input from "./common/input";

class CustomerForm extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      address: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .error(() => {
        return { message: "إسم الزبون مطلوب" };
      }),
    phone: Joi.string().allow("").allow(null),
    address: Joi.string().allow("").allow(null),
  };

  async componentDidMount() {
    const customerId = this.props.match.params.id;
    if (customerId === "new") return;

    const { data: customer } = await getCustomer(customerId);
    if (!customer) return this.props.history.replace("/customers");

    this.setState({ data: this.mapToViewModel(customer) });
  }

  mapToViewModel = (customer) => {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
    };
  };

  async doSubmit() {
    await saveCustomer(this.state.data);
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
            name="phone"
            label="رقم الهاتف"
            value={data.phone}
            error={errors.phone}
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
