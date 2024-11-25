// src/pages/NotFound.jsx

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <Container className="mt-5">
            <Row className="text-center">
                <Col>
                    <h1 className="display-1">404</h1>
                    <h2>Página no encontrada</h2>
                    <p className="lead">
                        Lo siento, no podemos encontrar la página que estás buscando.
                    </p>
                    <Link to="/">
                        <Button variant="primary" size="lg">
                            Regresar al inicio
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};


