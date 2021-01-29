import React from "react";

const Select = ({
  name,
  label = null,
  value,
  options,
  error = null,
  style = null,
  onChange,
}) => {
  return (
    <div className="form-group" style={style}>
      <label htmlFor={name}>{label}</label>

      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="form-control"
        style={style}
      >
        <option value="" />

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
