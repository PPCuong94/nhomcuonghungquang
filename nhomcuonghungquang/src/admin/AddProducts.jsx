import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';

import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await collection(db, 'products');
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Làm gì đó trong quá trình tải lên (nếu cần)
        },
        (error) => {
          toast.error('Hình ảnh chưa được tải lên: ' + error.message);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
            toast.success('Đã thêm sản phẩm');
            navigate('/dashboard/all-products');
            setLoading(false);
          });
        }
      );
    } catch (error) {
      toast.error('Có lỗi xảy ra: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h4 className='mb-5'>Thêm sản phẩm</h4>
            <Form onSubmit={addProduct}>
            <FormGroup className="form__group">
                <span>Tiêu đề sản phẩm</span>
                <input type="text" placeholder='Tên loại bánh'
                  value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
              </FormGroup>

              <FormGroup className="form__group">
                <span>Mô tả</span>
                <input type="text" placeholder='Miêu tả'
                  value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required />
              </FormGroup>

              <FormGroup className="form__group">
                <span>Sự miêu tả</span>
                <input type="text" placeholder='Sự miêu tả....'
                  value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
              </FormGroup>

              <div className='d-flex align-items-center justify-content-between gap-5'>
                <FormGroup className="form__group w-50">
                  <span>Giá</span>
                  <input type="number" placeholder='$10'
                    value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                </FormGroup>
              
                <FormGroup className="form__group w-50">
                  <span>Loại</span>
                  <select className='w-100 p-2'
                    value={enterCategory} onChange={e => setEnterCategory(e.target.value)} >
                    <option value="">Chọn Loại Bánh</option>
                    <option value='Bánh nướng'>Bánh nướng</option>
                    <option value='Bánh Bông Lan'>Bánh Bông Lan</option>
                    <option value='Bánh Dẻo'>Bánh Dẻo</option>
                    <option value='Bánh Nướng Trái Cây'>Bánh Nướng Trái Cây</option>
                    <option value='Bánh Kem'>Bánh Kem</option>
                  </select>
                </FormGroup>
              </div>

              <div>
                <FormGroup className="form__group">
                  <span>Hình ảnh sản phẩm</span>
                  <input type="file" onChange={e=> setEnterProductImg(e.target.files[0])} required />
                </FormGroup>
              </div>
              <button className="buy__btn" type='submit' disabled={loading}>
                {loading ? 'Đang thêm sản phẩm...' : 'Thêm Sản Phẩm'}
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;




