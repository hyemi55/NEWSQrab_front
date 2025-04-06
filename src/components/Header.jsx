import React  from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/Header.module.scss';

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <button onClick={() => navigate('/news')}>NewsQrab</button>
        </div>
    );
};