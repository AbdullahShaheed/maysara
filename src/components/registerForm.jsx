import React, { Component } from "react";
import { register } from "../services/userService";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";

class Regitser extends Form {
  state = {
    data: { username: "", password: "", name: "" },
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
    name: Joi.string()
      .required()
      .error(() => {
        return { message: "اسمك الذي تُعرف به في الموقع مطلوب" };
      }),
  };

  async doSubmit() {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
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
            labelSmall="بريدُك الالكتروني"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="كلمة المرور"
            value={data.password}
            error={errors.password}
            onChange={this.handleChange}
          />
          <Input
            name="name"
            label="الإسم"
            value={data.name}
            error={errors.name}
            labelSmall="إسمُك الذي تودّ أن يظهر في الموقع"
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">تسجيل</button>
        </form>
      </div>
    );
  }
}

export default Regitser;
