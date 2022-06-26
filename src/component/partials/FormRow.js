import React from "react";

function FormRow(props) {
  const { type, name, value, handleChange } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{name}:</label>
      <input
        type={type}
        name={name}
        value={value.name}
        onChange={handleChange}
      />
    </div>
  );
}

export default FormRow;
