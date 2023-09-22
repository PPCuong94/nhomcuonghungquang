import React from 'react';
import './footer.css'

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col lg="4" className="mb-4" md="6">
              <div className="logo">
                {/* <img src={logo} alt="logo" /> */}
                <div>
                  <h1 className="text-white">Cake Store</h1>
                  {/* <p>Since 1994</p> */}
                </div>
              </div>
              <p className="footer__text mt-4">
                Bánh Trung Thu cao cấp nhất. Thương hiệu bánh trung thu Cake Store
                là thương hiệu đã có tới nhiều năm hoạt động tại Sài Gòn
              </p>
            </Col>
  
            <Col lg="3" md="3" className="mb-4">
              <div className="footer__quick-links">
                <h4 className="quick__links-title">Top sản phẩm</h4>
                <ListGroup>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="#">Mobile Phones</Link>
                  </ListGroupItem>
  
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="#">Modern Sofa</Link>
                  </ListGroupItem>
  
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="#">Arm Chair</Link>
                  </ListGroupItem>
  
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="#">Smart Watches</Link>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
  
            <Col lg="2" md="3" className="mb-4">
              <div className="footer__quick-links">
                <h4 className="quick__links-title">Đường dẫn</h4>
                <ListGroup>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/shop">Cửa hàng</Link>
                  </ListGroupItem>
  
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/cart">Giỏ hàng</Link>
                  </ListGroupItem>
  
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/login">Đăng nhập</Link>
                  </ListGroupItem>
  
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="#">Chính sách bảo mật</Link>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
  
            <Col lg="3" md="4">
              <div className="footer__quick-links">
                <h4 className="quick__links-title">Liên hệ</h4>
                <ListGroup className="footer__contact">
                  <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span>
                      <i class="ri-map-pin-line"></i>
                    </span>
                    <p>123, Quận 12, TP HCM</p>
                  </ListGroupItem>
  
                  <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span>
                      <i class="ri-phone-line"></i>
                    </span>
                    <p>+84 0123456789</p>
                  </ListGroupItem>
  
                  <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span>
                      <i class="ri-mail-line"></i>
                    </span>
                    <p>CuongHungQuang@gmail.com</p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
  
            <Col lg="12">
              <p className="footer_copyright">
                Đồ án - Web bánh trung thu - Cường-Hưng-Quang.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  };
  
  export default Footer;
