import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from 'src/style/generator/Generator.module.scss'

export default function Generator() {
    const navigate = useNavigate();

    const handleSubmit = function(event) {
        event.preventDefault();

        navigate('/generating');
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>나만의 뉴스를 만들어 봐!</div>
            <form>
                    <input placeholder='뉴스 링크 붙여넣기' />
                    <button onClick={handleSubmit}>영상 만들기</button>
            </form>
        </div>
    )
}