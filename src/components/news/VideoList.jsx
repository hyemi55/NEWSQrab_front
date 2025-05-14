import React, {useState, useEffect, useRef} from 'react';
import styles from 'src/style/news/VideoList.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VideoList({ category }) {
    const [loading, setLoading] = useState(true);
    const [videoUrls, setVideoUrls] = useState(null);
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
                console.log(response.data);
                // setVideoUrls(response.data.urls);
                setVideoUrls(['https://www.w3schools.com/html/movie.mp4', '2','3','4', '5', '6', '7']);
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
                {videoUrls.map((url, index) => (
                    // <video key={index} src={url} controls />
                    <video onClick={() => navigate('/video-test')} key={index} src={url}/>
                ))}
            </div>
        </>
    )
}