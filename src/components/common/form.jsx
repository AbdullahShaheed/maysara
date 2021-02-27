import { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {};

  validate() {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return;
    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = (e) => {
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  handleGoldToggle = () => {
    const data = { ...this.state.data };
    data.isGold = !data.isGold;
    this.setState({ data });
  };
}

export default Form;
