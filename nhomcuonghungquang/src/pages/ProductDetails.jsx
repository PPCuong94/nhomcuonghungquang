import React, {useState, useRef, useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import products from '../asset/data/products';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommoSection';
import '../styles/product-details.css';
import { motion } from 'framer-motion';
import ProductsList from '../components/UI/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify'; 

// import { db } from '../firebase.config';
// import { doc, getDoc } from 'firebase/firestore';
// import useGetData from '../custom-hooks/useGetData';

const ProductDetails = () => {
    const [tab, setTab] = useState("desc");
    const reviewUser = useRef("");
    const reviewMsg = useRef("");
    const dispatch = useDispatch();
  
    const [rating, setRating] = useState(null);
    const { id } = useParams();
    const product = products.find((item) => item.id === id);
  
    const {
      imgUrl,
      productName,
      price,
      avgRating,
      reviews,
      description,
      shortDesc,
      category,
    } = product;
  
    const relatedProducts = products.filter((item) => item.category === category);
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      const reviewUserName = reviewUser.current.value;
      const reviewUserMsg = reviewMsg.current.value;
  
      const reviewObj = {
        userName: reviewUserName,
        text: reviewUserMsg,
        rating,
      };
      console.log(reviewObj);
      toast.success("Nhận được đánh giá");
    };
  
    const addToCart = () => {
      dispatch(
        cartActions.addItem({
          id,
          image: imgUrl,
          productName,
          price,
        })
      );
  
      toast.success("Sản phẩm thêm thành công!");
    };
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [product]);
  
    return (
      <Helmet title={productName}>
        <CommonSection title={productName} />
        <section className="pt-0">
          <Container>
            <Row>
              <Col lg="6">
                <img src={imgUrl} alt="" />
              </Col>
              <Col lg="6">
                <div className="product__detail">
                  <h2>{productName}</h2>
                  <div className="product__rating d-flex align-item-center gap-5 mb-3">
                    <div>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-half-s-line"></i>
                      </span>
                    </div>
  
                    <p>
                      (<span>{avgRating}</span>)ratings
                    </p>
                  </div>
  
                  <div className="d-flex align-items-center gap-3">
                    <span className="product__price">{price} vnđ</span>
                    <span>Loại: {category}</span>
                  </div>
                  <p className="mt-3">{shortDesc}</p>
  
                  <motion.button
                    whileTap={{ scale: 1.3 }}
                    className="buy__btn"
                    onClick={addToCart}
                  >
                    Thêm vào giỏ hàng
                  </motion.button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
  
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className="tab__wrapper d-flex align-items-center gap-5">
                  <h6
                    className={`${tab === "desc" ? "active__tab" : ""}`}
                    onClick={() => setTab("desc")}
                  >
                    Chú Thích
                  </h6>
                  <h6
                    className={`${tab === "rev" ? "active__tab" : ""}`}
                    onClick={() => setTab("rev")}
                  >
                    Đánh Giá ({reviews.length})
                  </h6>
                </div>
                {tab === "desc" ? (
                  <div className="tab__content mt-4">
                    <p>{description}</p>
                  </div>
                ) : (
                  <div className="product__review mt-4">
                    <div className="review__wrapper">
                      <ul>
                        {reviews?.map((item, index) => (
                          <li kew={index} className="mb-3">
                            <h6>Nguyễn Hưng</h6>
                            <span>{item.rating} (đánh giá)</span>
                            <p>{item.text}</p>
                          </li>
                        ))}
                      </ul>
  
                      <div className="review__form">
                        <h4>Để lại cảm nhận của bạn</h4>
                        <form action="" onSubmit={submitHandler}>
                          <div className="form__group">
                            <input
                              type="text"
                              placeholder="Nhập tên"
                              ref={reviewUser}
                              required
                            />
                          </div>
  
                          <div className="form__group d-flex align-items-center gap-3 rating__group">
                            <motion.span
                              whileTap={{ scale: 1.3 }}
                              onClick={() => setRating(1)}
                            >
                              1 <i class="ri-star-s-fill"></i>
                            </motion.span>
  
                            <motion.span
                              whileTap={{ scale: 1.3 }}
                              onClick={() => setRating(2)}
                            >
                              2 <i class="ri-star-s-fill"></i>
                            </motion.span>
  
                            <motion.span
                              whileTap={{ scale: 1.3 }}
                              onClick={() => setRating(3)}
                            >
                              3 <i class="ri-star-s-fill"></i>
                            </motion.span>
  
                            <motion.span
                              whileTap={{ scale: 1.3 }}
                              onClick={() => setRating(4)}
                            >
                              4 <i class="ri-star-s-fill"></i>
                            </motion.span>
  
                            <motion.span
                              whileTap={{ scale: 1.3 }}
                              onClick={() => setRating(5)}
                            >
                              5 <i class="ri-star-s-fill"></i>
                            </motion.span>
                          </div>
  
                          <div className="form__group">
                            <textarea
                              ref={reviewMsg}
                              rows={4}
                              type="text"
                              placeholder="Đánh giá"
                              required
                            />
                          </div>
  
                          <button type="submit" className="buy__btn">
                            Nhập
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
  
              <Col lg="12" className="mt-3">
                <h2 className="related__title">Bạn có thể thích</h2>
              </Col>
  
              <ProductsList data={relatedProducts} />
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  };
  
  export default ProductDetails;
