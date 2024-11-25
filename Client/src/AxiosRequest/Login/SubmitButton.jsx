import React from "react";
import { Button } from "react-bootstrap";

export const SubmitButton = ({ text }) => {
  return (
    <Button variant="primary" type="submit" className="w-100 py-2 mb-3 fw-bold shadow">
      {text}
    </Button>
  );
};
