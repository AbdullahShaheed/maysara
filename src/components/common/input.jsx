import React from "react";

const Input = ({
  name,
  label,
  labelSmall = "",
  value,
  error = null,
  type = "text",
  onChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        className="form-control"
        onChange={onChange}
      />
      <small className="form-text text-muted">{labelSmall}</small>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
