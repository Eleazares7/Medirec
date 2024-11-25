import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { useUser } from '../../Context/SaveUserData';

export const AdminDashboard = () => {

  const {user} = useUser();
  // Configuración de datos para ApexCharts
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    colors: ['#4CAF50'],
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Monthly Revenue',
      align: 'left',
    },
  };

  const chartSeries = [
    {
      name: 'Revenue',
      data: [1200, 1900, 3000, 5000, 2300, 3000, 4500],
    },
  ];

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <Col xs={12} md={8} lg={10}>
        <Card className="text-center shadow-sm mb-4">
          <Card.Body>
            <h1>Bienvenido {user ? user.user_name: ""}</h1>
            <p>Este es tu panel de control. Aquí puedes ver información importante sobre el rendimiento de la plataforma.</p>
          </Card.Body>
        </Card>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Revenue</Card.Title>
                <Card.Text>$1,200</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>New Users</Card.Title>
                <Card.Text>150</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Orders</Card.Title>
                <Card.Text>320</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm">
          <Card.Body>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};


