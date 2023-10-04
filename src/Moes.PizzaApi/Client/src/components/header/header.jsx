import Nav from 'react-bootstrap/Nav';

export default function Header() {
  return (
    <div className="page-container with-background-color">
      <Nav variant="tabs" defaultActiveKey="/">
        <h2>Moes Pizza</h2>
        <Nav.Item>
          <Nav.Link href="/">Picos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/orderList">Užsakymai</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
