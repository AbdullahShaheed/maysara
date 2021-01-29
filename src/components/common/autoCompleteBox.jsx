import React, { Component } from "react";

export default class AutoCompleteBox extends Component {
  state = {
    text: "",
    placeholder: "أدخل حرفين أو اكثر ...",
    suggestions: [],
  };

  handleChange = (e) => {
    const text = e.currentTarget.value;
    this.setState({ text });

    if (text.length <= 1) this.setState({ suggestions: [] });
    else {
      const suggestions = this.props.items.filter((p) =>
        p.name.toLowerCase().includes(text.toLowerCase())
      );
      this.setState({ suggestions });
    }
  };

  render() {
    const { text, placeholder, suggestions } = this.state;
    const { onItemSelect } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="product">المنتوج</label>
        <input
          id="product"
          type="text"
          value={text}
          className="form-control"
          placeholder={placeholder}
          onChange={this.handleChange}
          onMouseDown={() => this.setState({ text: "", placeholder: "" })}
        />
        <ul className="list-group">
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="list-group-item clickable"
              onClick={() => {
                this.setState({ text: s.name, suggestions: [] });
                onItemSelect(s);
              }}
            >
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
