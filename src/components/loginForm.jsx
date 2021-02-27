import React, { Component } from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
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

  async doSubmit() {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
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
