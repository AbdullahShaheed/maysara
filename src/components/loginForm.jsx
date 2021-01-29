import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .required()
      .error(() => {
        return { message: "إسم المستخدم مطلوب" };
      }),
    password: Joi.string()
      .min(3)
      .error(() => {
        return { message: "كلمة المرور مطلوبة على الأقل 3 أحرف" };
      }),
  };

  doSubmit() {
    //submit data to server, then redirect user to another page
    console.log("submitted");
    this.props.history.push("/");
  }

  render() {
    const { data, errors } = this.state;
    return (
      <div className="col-5">
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="إسم المستخدم"
            value={data.username}
            error={errors.username}
            labelSmall="بريدك الالكتروني"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="كلمة المرور"
            value={data.password}
            error={errors.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">دخول</button>
        </form>
      </div>
    );
  }
}

export default Login;
