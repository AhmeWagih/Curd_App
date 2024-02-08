import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  //console.log(error);
  return (
    <Container>
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <div className="mt-5 text-center">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
            <Button
              variant="link"
              onClick={() => navigate("/", { replace: true })}
            >
              Go Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Error;
