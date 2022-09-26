import React from "react";
import mycolor from "../../../config/color";

export function Button(props) {
    const { title, onClick, icon } = props;
    return (
      <button
        style={{
          borderRadius: 30,
          width: "100%",
          backgroundColor: mycolor.secondarySelected,
        }}
        type="button"
        className="btn btn-outline-info btn-lg"
        onClick={onClick}
      >
        <i className={`${icon} mr-1`}></i>
        {title}
      </button>
    );
  }

  export function SelectingBox(props) {
    const { errortext, value, onChange, data, title, disabled } = props;
    return (
      <div style={{ marginRight: 5, marginLeft: 5 }}>
        <label
          style={{ color: mycolor.secondarySelected, marginLeft: 2 }}
          htmlFor={`roleselectbox`}
          className="my-0"
        >
          {title}
        </label>
        <div className="input-group">
          <select
            className="custom-select"
            id="roleselectbox"
            style={{ borderRadius: 15 }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          >
            <option selected value={0}>
              --- Please Select ---
            </option>
            {data &&
              data.map((r, i) => (
                <option key={i.toString()} value={r.roleId}>
                  {r.role}
                </option>
              ))}
          </select>
        </div>
        {errortext && (
          <small
            id="emailHelp"
            className="form-text text-danger mt-0"
            style={{ marginLeft: 12 }}
          >
            {errortext}
          </small>
        )}
      </div>
    );
  }
  
  export function UserIdTextBox(props) {
    const {
      defaultTitle,
      title,
      type,
      placeholder,
      errortext,
      required,
      value,
      onChange,
      disabled,
    } = props;
    return (
      <div className="form-group" style={{ marginRight: 5, marginLeft: 5 }}>
        <label
          style={{ color: mycolor.secondarySelected, marginLeft: 2 }}
          htmlFor={`${title}${placeholder}${value}`}
          className="my-0"
        >
          {title}
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
            >
              {defaultTitle}
            </span>
          </div>
          <input
            disabled={disabled}
            type={type}
            className="form-control m-0"
            id={`${title}${placeholder}${value}`}
            placeholder={placeholder}
            required={required}
            autoComplete="off"
            style={{
              color: mycolor.onBg,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
            }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoCorrect="off"
          />
        </div>
        {errortext && (
          <small
            id="emailHelp"
            className="form-text text-danger mt-0"
            style={{ marginLeft: 12 }}
          >
            {errortext}
          </small>
        )}
      </div>
    );
  }
  
  export function NumberTextBox(props) {
    const {
      title,
      type,
      placeholder,
      errortext,
      required,
      value,
      onChange,
      icon,
      disabled,
    } = props;
    const handleChange = (evt) => {
      var financialGoal = evt.target.validity.valid ? evt.target.value : value;
      if (financialGoal.toString().length > 1) {
        while (financialGoal.toString().charAt(0) === "0") {
          financialGoal = financialGoal.substring(1);
        }
      }
      onChange(financialGoal);
    };
    return (
      <div className="form-group" style={{ marginRight: 5, marginLeft: 5 }}>
        <label
          style={{ color: mycolor.secondarySelected, marginLeft: 2 }}
          htmlFor={`${title}${placeholder}${value}`}
          className="my-0"
        >
          {title}
        </label>
        <div className="input-group">
          <input
            disabled={disabled}
            type={type}
            pattern="^-?[0-9]\d*\.?\d*$"
            className="form-control m-0"
            id={`${title}${placeholder}${value}`}
            placeholder={placeholder}
            required={required}
            style={{
              color: mycolor.onBg,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              borderTopRightRadius: icon ? 0 : 15,
              borderBottomRightRadius: icon ? 0 : 15,
            }}
            value={value}
            onChange={handleChange}
            autoComplete="off"
            autoCorrect="off"
          />
          {icon && (
            <div className="input-group-append">
              <div
                className="input-group-text"
                style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
              >
                <i
                  className={icon}
                  style={{ color: mycolor.secondarySelected, fontSize: 12 }}
                ></i>
              </div>
            </div>
          )}
        </div>
  
        {errortext && (
          <small
            id="emailHelp"
            className="form-text text-danger mt-0"
            style={{ marginLeft: 12 }}
          >
            {errortext}
          </small>
        )}
      </div>
    );
  }
  
  export function TextBox(props) {
    const {
      title,
      type,
      placeholder,
      errortext,
      required,
      value,
      onChange,
      disabled,
    } = props;
    return (
      <div className="form-group" style={{ marginRight: 5, marginLeft: 5 }}>
        <label
          style={{ color: mycolor.secondarySelected, marginLeft: 2 }}
          htmlFor={`${title}${placeholder}${value}`}
          className="my-0"
        >
          {title}
        </label>
        {type == "email" ? (
          <input
            disabled={disabled}
            type={type}
            className="form-control m-0"
            id={`${title}${placeholder}${value}`}
            aria-describedby="emailHelp"
            placeholder={placeholder}
            required={required}
            style={{ color: mycolor.onBg, borderRadius: 15 }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
          />
        ) : (
          <input
            type={type}
            className="form-control m-0"
            id={`${title}${placeholder}${value}`}
            placeholder={placeholder}
            required={required}
            style={{ color: mycolor.onBg, borderRadius: 15 }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete={type == "password" ? "new-password" : "off"}
            autoCorrect="off"
          />
        )}
        {errortext && (
          <small
            id="emailHelp"
            className="form-text text-danger mt-0"
            style={{ marginLeft: 12 }}
          >
            {errortext}
          </small>
        )}
      </div>
    );
  }
  
