import './LoginPage.css'
import logo from '../../assets/icons/logo_icon.svg'
import eye from '../../assets//icons/eye.svg'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../utils/api';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPassword, setForgotPassword] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password}))
            .unwrap()
            .then(() => {
                navigate('/projects')
            })
            .catch((err) => {
                console.error('Ошибка авторизации', err)
            })
    }

    const handleSendMail = async () => {
        try {
            await axios.post(`${api.defaults.baseURL}/auth/forgot-password`, { email: forgotPassword });
            alert('Письмо отправлено! Проверьте почту.');
        } catch (error) {
            console.error('Ошибка отправки', error);
            alert('Ошибка отправки. Проверьте email.');
        } finally {
            setOpenAlert(false);
        }
    };

    const handleTogglePassword = () => setShowPassword(!showPassword);

    return (
        <div className='login-page'>
            <img src={logo} alt='logo-icon' className='logo-icon br-25'/>
            <form className='form login-form' onSubmit={handleSubmit}>
                <div className='text-center'>
                    <h1>Добро пожаловать</h1>
                    <a className='m-top-12'>Войдите в систему, чтобы продолжить</a>
                </div>
                <input 
                    className='m-top-32' 
                    type='email' 
                    name='email' 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className='password-input m-top-12'>
                    <input
                        type={ showPassword ? 'text' : 'password'}
                        placeholder='Пароль'
                        className='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='btn-img position-a-img ' type='button' onClick={handleTogglePassword}>
                        <img src={eye} alt='eye' />
                    </button>
                </div>
                <button className='btn-submit m-top-32' type='submit'>Войти</button>
                <div className='forget-password'>
                    <p>Забыли пароль? <a href="###" onClick={() => setOpenAlert(true)}>Восстановить</a></p>
                </div>
            </form>
            {auth.status === 'loading' && <p>Загрузка...</p>}
            {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}

            {openAlert && (
                <div className="modal ">
                    <div className="modal-content p-32">
                        <h2 className='modal-title'>Восстановление пароля</h2>
                        <input
                            type="email"
                            placeholder="Введите email"
                            value={forgotPassword}
                            name='email'
                            onChange={(e) => setForgotPassword(e.target.value)}
                        />
                        <div className="modal-btn-group">
                            <button onClick={handleSendMail}>Отправить</button>
                            <button onClick={() => setOpenAlert(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}