import React, { useRef } from 'react';
import { Container, Row } from 'reactstrap';

import useAuth from '../custom-hooks/useAuth';
import '../styles/admin-nav.css';

import { NavLink, useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';


const admin__nav = [
  
  {
    display: 'Bảng điều khiển',
    path: '/dashboard'
  },
  {
    display: 'Thêm sản phẩm',
    path: '/dashboard/add-products'
  },
  {
    display: 'Tất cả sản phẩm',
    path: '/dashboard/all-products'
  },
  {
    display: 'Đơn đặt hàng',
    path: '/dashboard/orders'
  },
  {
    display: 'Người dùng',
    path: '/dashboard/users'
  },
];






const AdminNav = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const profileActionRef = useRef(null);

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle('show__profileActions');
  
  
  const logout = () => {
 
    signOut(auth)
      .then(() => {
        toast.success('Đăng Xuất');
        navigate('/adminlogin');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <>
      <header className='admin__header'>
        <div className='admin__nav-top'>
          <Container>
            <div className='admin__nav-wrapper-top'>
              <div className='logo'>
                <h2>
                  Moon<span className='mauthuonghieu'>Cake</span>
                </h2>
              </div>

              <div className='search__box'>
                <input type='text' placeholder='Tìm Kiếm.....' />
                <span>
                  <i class='ri-search-line'></i>
                </span>
              </div>

              <div className='admin__nav-top-right'>
                <motion.span whileTap={{ scale: 1.2 }}>
                  <i class='ri-notification-3-line'></i>
                </motion.span>
                <motion.span whileTap={{ scale: 1.3 }}>
                  <i class='ri-settings-2-line'></i>
                </motion.span>
                <div>
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={currentUser && currentUser.photoURL}
                    alt=''
                    onClick={toggleProfileActions}
                  />

                  <div
                    className='profile__actions'
                    ref={profileActionRef}
                    onClick={toggleProfileActions}
                  >
                    {currentUser ? (
                      <span onClick={logout}>Đăng Xuất</span>
                    ) : (
                      <div>
                        <Link to='/signup'>Đăng Ký</Link>
                        <Link to='/login'>Đăng Nhập</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className='admin__menu p-0'>
        <Container>
          <Row>
            <div className='admin__navigation'>
              <ul className='admin__menu-list mt-3'>
                {admin__nav.map((item, index) => (
                  <li className='admin__menu-item' key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'active__admin-menu' : ''
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
