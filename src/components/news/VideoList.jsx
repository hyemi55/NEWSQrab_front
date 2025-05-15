import React, {useState, useEffect, useRef} from 'react';
import styles from '../../style/news/VideoList.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VideoList({ category }) {
    const [loading, setLoading] = useState(true);
    const [reelsData, setReelsData] = useState(null);
    const currentCategory = useRef(category);
    const navigate = useNavigate();

    if (currentCategory.current != category) {
        setLoading(true);
        currentCategory.current = category
    }

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reels/sorted/views`);

                setReelsData(response.data);
                setLoading(false);

            } catch (error) {
                console.log("숏폼 불러오기 실패", error);
            }
        };

        fetchVideos();

    }, [category, loading]);

    if(loading) return <p>Loading...</p>;

    return (
        <>
            <div className={styles.videoContainer}>
                {reelsData.map((reels, index) => (
                    <video onClick={() => {
                        navigate(`/reels/${reels._id}`, {
                            state: {
                                currentIndex: index,
                                reelsDataList: reelsData,
                            }
                        })
                    }} key={index} src={reels.reelsUrl}/>
                ))}
            </div>
        </>
    )
}