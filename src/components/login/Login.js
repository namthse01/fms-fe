import React, { useEffect, useState } from "react";
import './Login.scss';
import loginImg from '../../assets/images/login.png';
import { useNavigate } from "react-router-dom";

const Login = () => {

    //local state

    const navigate = useNavigate();

    return (
        <div>
            <div className="container">
                <div className="item">
                    <div className="loginImage">
                        <img src={loginImg} width="300" style={{ position: 'relative' }} alt="login" />
                    </div>
                    <div className="loginForm">
                        <form className='login-form'>
                            <div className="form-group">
                                <label for="account">Tài khoản</label>
                                <input type="tẽt" className="form-control" id="account" aria-describedby="emailHelp" placeholder="Nhập tên tài khoản" />
                            </div>
                            <div class="form-group">
                                <label for="paswordInput">Mật khẩu</label>
                                <input type="password" className="form-control" id="paswordInput" placeholder="Nhập mật khẩu" />
                            </div>
                            <button type="submit" className="btn btn-primary"
                                onClick={() => {
                                    navigate('/manager/order');
                                }}
                            >
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
