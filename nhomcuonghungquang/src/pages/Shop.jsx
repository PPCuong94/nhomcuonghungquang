

import React,{useState} from 'react';

import CommoSection from '../components/UI/CommoSection';
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap';

import '../styles/shop.css'

import products from '../asset/data/products';
import ProductsList from '../components/UI/ProductsList'

const Shop = () => {

    const [productsData, setProductData] = useState(products)

    const handleFilter = e => {
        const filterValue = e.target.value
        if (filterValue === 'Bánh nướng') {
            const filteredProduct = products.filter(item => item.category === 'Bánh nướng');

            setProductData(filteredProduct);
        }

        if (filterValue === 'Bánh Bông Lan') {
            const filteredProduct = products.filter(item => item.category === 'Bánh Bông Lan');

            setProductData(filteredProduct);
        }

        if (filterValue === 'Bánh Kem') {
            const filteredProduct = products.filter(item => item.category === 'Bánh Kem');

            setProductData(filteredProduct);
        }

        if (filterValue === 'Bánh Dẻo') {
            const filteredProduct = products.filter(item => item.category === 'Bánh Dẻo');

            setProductData(filteredProduct);
        }

        if (filterValue === 'Bánh Nướng Trái Cây') {
            const filteredProduct = products.filter(item => item.category === 'Bánh Nướng Trái Cây');

            setProductData(filteredProduct);
        }
    };


    const handleSearch = e => {
        const searchTerm = e.target.value

        const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
        
            setProductData(searchedProducts)
    }

    return <Helmet title='Shop'>
        <CommoSection title={'Sản Phẩm'} />


        <section>
            <Container>
                <Row>
                    <Col lg='3' md='6'>
                        <div className="filter__widget">
                            <select onChange={handleFilter}>
                                <option>Chọn Loại Bánh</option>
                                <option value="Bánh nướng">Bánh Nướng</option>
                                <option value="Bánh Bông Lan">Bánh Bông Lan</option>
                                <option value="Bánh Kem">Bánh Kem</option>
                                <option value="Bánh Dẻo">Bánh Dẻo</option>
                                <option value="Bánh Nướng Trái Cây">Bánh Nướng Trái Cây</option>
                            </select>
                        </div>
                    </Col>
                    <Col lg='3' md='6' className='text-end'>
                    <div className="filter__widget">
                            <select>
                                <option>Sắp xếp theo</option>
                                <option value="ascending">Tăng Dần</option>
                                <option value="descending">Giảm Dần</option>
                                
                            </select>
                        </div>
                    </Col>
                    <Col lg='6' md='12'>
                        <div className="search__box">
                            <input type="text" placeholder='Tìm kiếm.....' onChange={handleSearch}/>
                            <span><i className="ri-search-line"></i></span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <section className='pt-0'>
            <Container>
                <Row>
                    {
                        productsData.length === 0 ? <h1 className='text-center fs-4'>Không có sản phẩm được tìm thấy!</h1>
                            : <ProductsList data={productsData} />
                    }
                </Row>
            </Container>
        </section>
    </Helmet> ;
};

export default Shop;
