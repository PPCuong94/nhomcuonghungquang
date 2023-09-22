import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
 
import '../styles/login.css';

const AdminLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate= useNavigate()

    const signIn = async (e) => {
        
        e.preventDefault()
        setLoading(true)

        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            console.log(user)
            setLoading(false)
            toast.success('Đăng Nhập Thành Công')
            navigate('/dashboard')
            
        } catch (error) {
            setLoading(false)
            toast.error('Tài Khoản Mật Khẩu Sai')
            // toast.error(error.message)
        }
    }

    return <Helmet title='AdminLogin'>
        <section>
            <Container>
                <Row>
                    {
                        loading ? <Col lg='12' className='text-center'>
                            <h5 className='fw-bold'>Loading.....</h5></Col> : <Col lg='6' className='m-auto text-center'>
                        <h3 className='fw-bold mb-4'>Admin</h3>

                        <Form className='auth__form' onSubmit={signIn}> 
                            <FormGroup className='form__group'>
                                <input type="email" placeholder='Nhập Enail của bạn' value={email} onChange={e=> setEmail(e.target.value)} />
                            </FormGroup>

                            <FormGroup className='form__group'>
                                <input type="password" placeholder='Nhập Password của bạn' value={password} onChange={e=> setPassword(e.target.value)}  />
                            </FormGroup>

                            <button type='submit' className="buy__btn auth__btn">Đăng Nhập</button>
                            <p> <Link to='/signup'></Link></p>
                        </Form>
                    </Col>
                    }
                </Row>
            </Container>
        </section>
    </Helmet>
};

export default AdminLogin;
