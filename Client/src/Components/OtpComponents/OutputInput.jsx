import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export const OtpInput = ({ otp = [], handleChange, handleKeyDown }) => {
  return (
    <Row className="justify-content-center mt-3">
      {otp.map((data, index) => (
        <Col xs={2} key={index} className="text-center">
          <Form.Control
            id={`otp-input-${index}`} 
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)} 
            className="otp-input text-center"
            style={{
              fontSize: "2rem",
              height: "50px",
              width: "50px",
              margin: "5px",
              textAlign: "center",
            }}
          />
        </Col> 
      ))}
    </Row>
  );
};
