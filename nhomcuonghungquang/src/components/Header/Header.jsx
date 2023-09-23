import React, { useRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { motion } from "framer-motion";
import logo from "../../asset/images/eco-logo.png";
import userIcon from "../../asset/images/user-icon.png";
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
  {
    path: "home",
    display: "Trang Chủ",
  },
  {
    path: "shop",
    display: "Cửa Hàng",
  },
  {
    path: "cart",
    display: "Giỏ Hàng",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [showProfileActions, setShowProfileActions] = useState(false);

  const stickyHeaderFunc = () => {
    if (headerRef.current) {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Đăng Xuất");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();
    window.addEventListener("scroll", stickyHeaderFunc);

    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  const menuToggle = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("active__menu");
    }
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () => {
    setShowProfileActions(!showProfileActions);
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>
                  <Link to="home">
                    {" "}
                    Cake<span className="maucam">Store</span>
                  </Link>
                </h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">0</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />
                {showProfileActions && (
                  <div className="profile__actions" ref={profileActionRef}>
                    {currentUser ? (
                      <span onClick={logout}>Đăng Xuất</span>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center flex-column">
                        <Link to="/signup">Đăng Ký</Link>
                        <Link to="/login">Đăng Nhập</Link>
                        <Link to="/adminlogin">Admin</Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
