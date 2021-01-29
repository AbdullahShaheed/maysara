import React, { Component } from "react";
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

  doSubmit() {
    //submit data to server, then redirect user to another page
    console.log("submitted");
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
