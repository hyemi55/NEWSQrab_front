import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Generate() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadType, setUploadType] = useState("text");

    //텍스트 업로드 핸들러
    const handleTextUpload = async (event) => {
        if (!event.target.value) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("text", event.target.value);

        try {
            const response = await axios.post( BACKEND_URL, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            setData(response);
        } catch (error) {
            console.error("Error uploading file", error);
        } finally {
            setLoading(false);
        }
    }

    //링크 업로드 핸들러
    const handleUrlUpload = async (event) => {
        const url = event.target.value;
        if (!url) return;

        setLoading(true);
        try {
            const response = await axios.prototype(BACKEND_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setData(response);
        } catch (error) {
            console.error("Error uploading file", error);
        } finally {
            setLoading(false);
        }
    }

    //파일 업로드 핸들러
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(BACKEND_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setData(response);
        } catch (error) {
            console.error("Error uploading file", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Generation Page</h1>
            <div className="generateContainer" style={{display: 'flex'}}>
                {data ? (
                    <video>
                        <source src={data} type="video/mp4" />
                    </video>
                ) : (
                    <div style={{width: '312px', height: '510px', backgroundColor: 'black'}}></div>
                )}
                
                <div>
                    <button onClick={()=>setUploadType('text')}>TEXT</button>
                    <button onClick={()=>setUploadType('url')}>URL</button>
                    <button onClick={()=>setUploadType('file')}>FILE</button>

                    <form>
                        {uploadType=='text' && <input type='text' />}
                        {uploadType=='url' && <input type='url' />}
                        {uploadType=='file' && <input type='file' accept="./pdf, .docx" />}
                        <button>Generate</button>
                    </form>
                </div>
            </div>
            <button onClick={()=>navigate('/')}>Main</button>
        </>
    )
}