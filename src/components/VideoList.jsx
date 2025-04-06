import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from '../style/VideoList.module.scss';

export default function VideoList({ category }) {
    const [loading, setLoading] = useState(true);
    const [videoUrls, setVideoUrls] = useState(null);

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
            } catch (error) {
                console.log("숏폼 불러오기 실패", error);
            } finally {
                setLoading(false);
            }
            console.log(videoUrls, loading);
        };

        fetchVideos();
    }, [category]);

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