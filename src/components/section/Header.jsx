import React  from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../style/section/Header.module.scss';

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <button onClick={() => navigate('/')}>News<span style={{ color: '#FF543D' }}>Q</span>rab</button>
        </div>
    );
};