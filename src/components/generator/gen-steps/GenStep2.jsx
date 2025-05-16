import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styles from '../../../style/generator/gen-steps/GenStep2.module.scss'

export default function GenStep2({ charA, charB, conversation, setConversation, setConversationId, isLoading, setIsLoading }) {
    const [userInput, setUserInput] = useState("");
    const [userInputArray, setUserInputArray] = useState([]);
    const { articleId } = useParams();
    const [parentId, setParentId] = useState("");

    useEffect(() => {
        const fetchConversation = async () => {
            const postDataForOriginal = {
                articleId: articleId,
                // articleId: "66a93851a574023e7bbfc565",
            }

            try {
                const response1 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/generate/original`, postDataForOriginal);

                // 백엔드 서버 배포되면 삭제할 것
                // setConversation(response1.data.script);
                // setParentId(response1.data._id);
                // setConversationId(response1.data._id);
                // setIsLoading(false);


                // 백엔드 rag 코드 없어서 안 됨. 백엔드 서버 배포되면 주석 제거
                const parentConversationId = response1.data._id;
                const postDataForRag = {
                    articleId: articleId,
                    parentConversationId: parentConversationId,
                }
                const response2 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/generate/rag-modified`, postDataForRag);

                setConversation(response2.data.script);
                setParentId(response2.data._id);
                setConversationId(response2.data._id);
                setIsLoading(false);

            } catch (error) {
                console.log("conversation 불러오기 에러: ", error);
            }
        }

        fetchConversation();

    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        setUserInputArray(userInputArray.concat([userInput]));
        setIsLoading(true);

        const postDataForModified = {
            articleId: articleId,
            parentId: parentId,
            userRequest: userInput,
        }

        setUserInput("");

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/generate/user-modified`, postDataForModified);

            setConversation(response.data.script);
            setParentId(response.data._id);
            setConversationId(response.data._id);

        } catch (error) {
            console.log("conversation 수정 에러: ", error);
        }

        setIsLoading(false);
    };


    return ( 
        <div className={styles.container}>
            <div className={styles.title}>원하는 톤으로 대화를 수정해 봐!</div>

            <div className={styles.mainContentContainer}>
                <div className={styles.conversationContainer}>
                    {isLoading ? <div>대화 생성 중...</div> : (
                        conversation.map((lineObj, index) => {
                            const [speaker, text] = Object.entries(lineObj)[0];
                            return (
                                <div key={index} className={styles.lineBlock}>
                                    <strong>{speaker=='user1' ? charB : charA}</strong><br/>
                                    {text}
                                </div>
                            );
                        }
                    ))}
                </div>
                <div>
                    <div className={styles.userInputChatContainer}>
                        {userInputArray.map((input, idx) => (
                            <div className={styles.userInputChat} key={idx}>{input}</div>
                        ))}
                    </div>
                    <form className={styles.userInputForm} onSubmit={handleSubmit}>
                        <input type='text' placeholder='수정하고 싶은 대로 입력해봐!' value={userInput} 
                                onChange={(e) => setUserInput(e.target.value)}/>
                        <button className={`${isLoading ? styles.inActiveButton: ""}`}>수정</button>
                    </form>
                </div>
                
            </div>

        </div>
    )
}