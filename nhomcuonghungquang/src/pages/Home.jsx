import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from "../asset/images/Banh1.jpg";

import ProductsList from "../components/UI/ProductsList";

import Clock from "../components/UI/Clock";

import counterImg from "../asset/images/kinh_do.png";

import useGetData from "../custom-hooks/useGetData";

const Home = () => {
  const { data: products, loading } = useGetData("products");

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    // Kiểm tra xem products đã được định nghĩa ở đâu và đảm bảo nó chứa dữ liệu.
    // Điều này phụ thuộc vào cách bạn lấy dữ liệu sản phẩm.
    const filterdTrendingProducts = products.filter(
      (item) => item.category === "Bánh Kem"
    );

    const filterdBestSalesProducts = products.filter(
      (item) => item.category === "Bánh nướng"
    );

    const filterdMobileProducts = products.filter(
      (item) => item.category === "Bánh Bông Lan"
    );

    const filterdWirelessProducts = products.filter(
      (item) => item.category === "Bánh Nướng Trái Cây"
    );

    const filterdPopularProducts = products.filter(
      (item) => item.category === "Bánh Dẻo"
    );

    // Kiểm tra và gán dữ liệu cho các state nếu nó tồn tại.
    if (setTrendingProducts) {
      setTrendingProducts(filterdTrendingProducts);
    }
    if (setBestSalesProducts) {
      setBestSalesProducts(filterdBestSalesProducts);
    }
    if (setMobileProducts) {
      setMobileProducts(filterdMobileProducts);
    }
    if (setWirelessProducts) {
      setWirelessProducts(filterdWirelessProducts);
    }
    if (setPopularProducts) {
      setPopularProducts(filterdPopularProducts);
    }
  }, [products]);

  // Rest of your component code...

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Sản phẩm xu hướng {year}</p>
                <h2>BÁNH TRUNG THU CAO CẤP NHẤT</h2>
                <p>
                  Thương hiệu bánh trung thu cao cấp đã có thương hiệu 50 năm
                  tại Sài Gòn
                </p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="shop">Mua ngay</Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Sản Phẩm Xu Hướng</h2>
            </Col>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>

      <section best__sales>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Bán Chạy</h2>
            </Col>

            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-3">Thời hạn ưu đãi</h4>
                <h3 className="text-white fs-5 mb-3">Sản phẩm bánh ưu đãi</h3>
              </div>
              <Clock />

              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Ghé vào </Link>
              </motion.button>
            </Col>

            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Sản Phẩm Mới</h2>
            </Col>

            <ProductsList data={mobileProducts} />
            <ProductsList data={wirelessProducts} />
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Sản Phẩm Phổ Biến</h2>
            </Col>

            <ProductsList data={popularProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
