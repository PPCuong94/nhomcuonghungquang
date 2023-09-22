import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../styles/dashboard.css';

import useGetData from '../custom-hooks/useGetData';

const Dashboard = () => {

  const { data: products } = useGetData('products');
  const { data: users } = useGetData('users');

  return (
    <>
      <section>
        <Container>
          <Row className='text-center'>
          <Col className="lg-3">
            <div className='revenue__box'>
              <h5 className=' fw-bold'>Tổng Doanh Thu</h5>
              <span>$9999</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className='order__box'>
              <h5 className=' fw-bold'>Đơn Hàng</h5>
              <span>9999</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className='products__box'>
              <h5 className=' fw-bold'>Tổng Sản phẩm</h5>
                <span>{ products.length}</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className='users__box'>
              <h5 className=' fw-bold'>Tổng số thành viên</h5>
              <span>{ users.length}</span>
            </div>
          </Col>
          </Row>
        </Container>
      </section>
    </>
  );
  
};

export default Dashboard;
