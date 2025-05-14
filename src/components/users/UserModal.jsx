import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUserName } from 'src/redux/modules/user.jsx';
import styles from "src/style/users/UserModal.module.scss"
import UserIcon from "src/assets/img/user.png";

export default function UserModal({ isLogin, setIsLogin }) {
    const dispatch = useDispatch();
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    const handleLoginClick = async (event) => {
        event.preventDefault();

        const postDataForLogin = {
            username: username,
            password: password,
        }
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, postDataForLogin);
            localStorage.setItem('accessToken', response.data.accessToken);
            dispatch(setUserName(username));

            setIsLogin(false);

        } catch (error) {
            console.log("로그인 실패: ", error);
        }
    }

    const handleRegisterGrayClick = () => {
        setIsRegister(true);
        setUsername("");
        setPassword("");
    }
    
    const handleRegisterClick = async (event) => {
        event.preventDefault();

        const postDataForRegister = {
            username: username,
            password: password,
            nickname: nickname,
            profilePicture: profilePicture,
        }
        
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, postDataForRegister);

            setIsRegister(false); 

        } catch (error) {
            console.log("회원가입 실패: ", error);
        }
    }


    return (
        <div>
            {!localStorage.getItem("accessToken") ? <button className={styles.loginButton} onClick={() => setIsLogin(true)}>로그인</button> :
                                                    <button className={styles.profileButton} onClick={() => localStorage.removeItem("accessToken")}><img src={UserIcon} /></button>
            }

            {isLogin && (
                <div className={styles.backdrop}>
                    <form className={styles.modal}>
                        <div className={styles.logo}>News<span style={{ color: "#FF432A" }}>Q</span>rab</div>
                        {isRegister && (
                            <input type='text' placeholder="프로필 이미지 URL" className={styles.input} 
                            value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)}/>
                        )}
                        <input type="text" placeholder="이메일" className={styles.input} 
                                value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" placeholder="비밀번호" className={styles.input} 
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {isRegister && (
                            <input type="text" placeholder="닉네임" className={styles.input} 
                            value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                        )}
                        {!isRegister ? (
                            <>
                            <button className={styles.modalLoginButton} onClick={handleLoginClick}>로그인</button>
                            <button className={styles.modalRegisterButtonGray} onClick={handleRegisterGrayClick}>회원가입</button>
                            </>
                        ) : <button className={styles.modalRegisterButton} onClick={handleRegisterClick}>회원가입</button>
                        }
                    </form>
                </div>
            )}
        </div>
    )
}