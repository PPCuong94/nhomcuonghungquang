import React from "react";
import "../styles/cart.css";
import Helmet from "./../components/Helmet/Helmet";
import CommonSection from "./../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { motion } from "framer-motion";

import { cartActions } from "./../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Giỏ hàng">
      <CommonSection title="Giỏ hàng mua sắm" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">
                  Không có sản phẩm được thêm vào giỏ hàng.
                </h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tiêu đề</th>
                      <th>Giá cả</th>
                      <th>Số lượng</th>
                      <th>Xoá</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="3">
              <div>
                <h6 className="d-flex align-item-center justify-content-between">
                  Tổng :<span className="fs-4 fw-bold">{totalAmount} vnđ</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">Thuế và phí vận chuyển :</p>
              <div>
                <button className="buy__btn w-100">
                  <Link to="/checkout">Thanh toán</Link>
                </button>
                <button className="buy__btn w-100 mt-3">
                  <Link to="/shop">Tiếp tục mua sắm</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>{item.price} vnđ</td>
      <td>{item.quantity} cái</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.3 }}
          onClick={deleteProduct}
          class="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;
