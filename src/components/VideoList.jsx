import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import styles from '../style/VideoList.module.scss';

export default function VideoList({ category }) {
    const [loading, setLoading] = useState(true);
    const [videoUrls, setVideoUrls] = useState(null);
    const currentCategory = useRef(category);

    if (currentCategory.current != category) {
        setLoading(true);
        currentCategory.current = category
    }

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // const response = await axios({
                //     method: 'get',
                //     url: BACKEND_URL,
                //     params: {
                //       "category": category
                //     }
                //   }, { withCredentials : true })
                // setVideoUrls(response.data.urls);
                setVideoUrls(['1', '2','3','4', '5', '6', '7']);
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
                    <video key={index} src={url} controls />
                ))}
            </div>
        </>
    )
}