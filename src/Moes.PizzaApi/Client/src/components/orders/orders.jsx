import { useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Header from '../header/header';

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const containerStyle = {
    padding: '20px',
  };

  const rowStyle = {
    border: '2px solid #f0f0f0',
    background: 'linear-gradient(to bottom, #FF6B6B, #FF3D3D)',
    color: 'white',
    padding: '10px',
    borderRadius: '10px',
  };

  const buttonStyle = {
    marginTop: '15px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  const modalContentStyle = {
    padding: '20px',
  };

  return (
    <div className="page-container">
      <Header />
      <Container style={containerStyle}>
        <Row style={rowStyle}>
          <Col>
            <h3>2023 M. Spalio 2D. Pirmadienis</h3>
            <p>Items: 2; Total Price: 13.00€</p>
          </Col>
          <Col></Col>
          <Col>
            <Button style={buttonStyle} onClick={openModal}>
              Info
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#FF3D3D' }}>
            Užsakymo Informacija
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalContentStyle}>
          <p>Vidutinė Papperoni (10,00€)</p>
          <ul>
            <li>+ Agurkai</li>
            <li>+ suris</li>
            <li>+ jelapenas</li>
          </ul>
          <p>Bendra suma: 13.00€</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Uždaryti
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyComponent;
