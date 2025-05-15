import axios from "axios";
import React from "react";

export default function DownloadTest() {
    const handleDownloadClick = async () => {
        try {
            const response = await axios.get('https://newsqrab.kr.object.ncloudstorage.com/reels/eeb169c8-b0fc-4b40-aa33-29628df52a38.mp4',
                {
                    responseType: 'blob',
                }
            );

            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'my-video.mp4';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('다운로드 실패:', error);
        }
    }

    return (
        <div>
            <video src='https://newsqrab.kr.object.ncloudstorage.com/reels/eeb169c8-b0fc-4b40-aa33-29628df52a38.mp4'></video>
            <button onClick={handleDownloadClick}>다운로드</button>
        </div>
        
    )
}