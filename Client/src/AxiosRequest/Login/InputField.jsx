// components/InputField.js
import React from "react";
import { Form } from "react-bootstrap";

const InputField = ({ label, type, placeholder, value, onChange, icon, onIconClick }) => (
  <Form.Group className="mb-3">
    <Form.Label className="fw-semibold">{label}</Form.Label>
    <div className="position-relative">
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="py-2"
      />
      {icon && (
        <span
          className="position-absolute"
          style={{ right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#0d6efd" }}
          onClick={onIconClick}
        >
          {icon}
        </span>
      )}
    </div>
  </Form.Group>
);

export default InputField;
