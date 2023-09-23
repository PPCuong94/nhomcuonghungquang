import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';
import { toast } from 'react-toastify';

const AllProducts = () => {

    const { data: productData, loading } = useGetData('products');
    
    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, 'products', id))
        toast.success('Đã Xóa')
    }

    return <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Hình Ảnh</th>
                                <th>Tiêu Đề</th>
                                <th>Loại</th>
                                <th>Giá</th>
                                <th>Hoạt động</th>
                            </tr>
                        </thead>   
                        <tbody>
                            {
                                loading ? (<h4 className='py-5 text-center fw-bold'>Loading.....</h4>
                                 ) : (
                                    productData.map(item => (
                                        <tr key={item.id}>
                                    <td><img src={item.imgUrl} alt="" /></td>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>${item.price}</td>
                                            <td><th><button onClick={() => {
                                                deleteProduct(item.id);
                                            }} className='btn btn-danger'>Xóa</button></th></td>
                                </tr>
                                    )))
                                
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    </section>
  
}

export default AllProducts;
