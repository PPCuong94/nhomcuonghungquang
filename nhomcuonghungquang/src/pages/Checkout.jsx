import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommoSection';

import { toast } from 'react-toastify';

import '../styles/checkout.css';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const totalQty = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    const [enterTitle, setEnterTitle] = useState('');
    const [enterShortDesc, setEnterShortDesc] = useState('');
    const [enterDescription, setEnterDescription] = useState('');
    const [enterCategory, setEnterCategory] = useState('');
    const [enterPrice, setEnterPrice] = useState('');
    const [enterNation, setEnterNation] = useState('');

    const addProduct = async (e) => {
        e.preventDefault();

        const product = {
            title: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            nation: enterNation,
        };

        // Thực hiện xử lý đặt hàng ở đây, và sau khi đặt hàng thành công:
        // ...

        // Hiển thị thông báo thành công
        toast.success('Đặt hàng thành công!');

        // Xóa dữ liệu nhập sau khi đặt hàng thành công nếu cần
        setEnterTitle('');
        setEnterShortDesc('');
        setEnterDescription('');
        setEnterCategory('');
        setEnterPrice('');
        setEnterNation('');
    };

    return (
        <Helmet title='Checkout'>
            <CommonSection title='Thủ Tục Thanh Toán' />
            <section>
                <Container>
                    <Row>
                        <Col lg='8'>
                            <h6 className='mb-4 fw-bold text-center abc'>Thông Tin Thanh Toán</h6>
                            <Form className='billing__form' onSubmit={addProduct}>
                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='Nhập tên của bạn' value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
                                </FormGroup>

                                <FormGroup className='form__group'>
                                    <input type="email" placeholder='Nhập Email của bạn' value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
                                </FormGroup>

                                <FormGroup className='form__group'>
                                    <input type="number" placeholder='Số điện thoại' value={enterCategory} onChange={e => setEnterCategory(e.target.value)} required />
                                </FormGroup>

                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='Địa chỉ đường phố' value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required />
                                </FormGroup>

                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='Mã bưu chính' value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                                </FormGroup>

                                <FormGroup className='form__group'>
    
                                    <input type="text" placeholder='Quốc Gia' value={enterNation} onChange={e => setEnterNation(e.target.value)} required />
                                </FormGroup>
                                <button
                                    type='submit'
                                    onSubmit={addProduct}
                                    className="buy-btn btn-primary auth__btn w-50 fw-bold mt-5 a"
                                    style={{ marginRight: 'auto' }}
                                >
                                    Đặt Hàng Ngay
                                </button>
                            
                            </Form>
                        </Col>

                        <Col lg='4'>
                            <div className='checkout__cart'>
                                <h6>Sản Phẩm : <span>{totalQty} Mặt Hàng</span></h6>
                                <h6>Tổng Phụ: <span>$ {totalAmount}</span></h6>
                                <h6>
                                    <span>Đang chuyển hàng <br />Miễn phí giao hàng </span><span>Miễn Phí</span>
                                </h6>
                                <h4>Tổng chi phí: <span>$ {totalAmount}</span></h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Checkout;





