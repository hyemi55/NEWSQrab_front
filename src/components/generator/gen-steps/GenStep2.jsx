import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styles from 'src/style/generator/gen-steps/GenStep2.module.scss'

export default function GenStep2({ conversation, setConversation }) {
    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
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
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/generate/original`, postDataForOriginal);
                // console.log(response);
                // console.log(response.data);
                // console.log(response.data.script);
                // console.log(Object.values(response.data.script[0]));

                setConversation(response.data.script);
                setParentId(response.data._id);
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
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.script);
            // console.log(Object.values(response.data.script[0]));

            setConversation(response.data.script);
            setParentId(response.data._id);
            // console.log(userInputArray);

        } catch (error) {
            console.log("conversation 수정 에러: ", error);
        }

        setIsLoading(false);
    };


    return ( 
        <div className={styles.container}>
            <h2>원하는 톤으로 대화를 수정해 봐!</h2>

            <div className={styles.mainContentContainer}>
                <div className={styles.conversationContainer}>
                    {isLoading ? <div>대사 생성 중...</div> : (
                        conversation.map((lineObj, index) => {
                            const [speaker, text] = Object.entries(lineObj)[0];
                            return (
                                <div key={index} className={styles.lineBlock}>
                                    <strong>{speaker=='user1' ? '캐릭터B' : '캐릭터A'}</strong><br/>
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
                        <button>수정</button>
                    </form>
                </div>
                
            </div>

        </div>
    )
}