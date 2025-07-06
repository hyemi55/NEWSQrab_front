import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styles from '../../../style/generator/gen-steps/GenStep2.module.scss'
import { useSelector } from 'react-redux';

export default function GenStep2({ conversation, setConversation, setConversationId, isLoading, setIsLoading }) {
    const char1 = useSelector((state) => state.characters.char1);
    const char2 = useSelector((state) => state.characters.char2);
    const [ userInput, setUserInput ] = useState("");
    const [ userInputArray, setUserInputArray ] = useState([]);
    const { articleId } = useParams();
    const [ parentId, setParentId ] = useState("");
    const [ progress, setProgress ] = useState(0);
    const [ targetProgress, setTargetProgress ] = useState(0);

    useEffect(() => {
        const fetchConversation = async () => {

            const postDataForOriginal = {
                articleId: articleId,
                character1: char1.species,
                character2: char2.species,
            }

            try {
                setProgress(10);
                setTargetProgress(20);

                const response1 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/generate/original`, postDataForOriginal);

                const parentConversationId = response1.data._id;
                const postDataForRag = {
                    articleId: articleId,
                    parentId: parentConversationId,
                    character1: char1.species,
                    character2: char2.species,
                }

                setProgress(20);
                setTargetProgress(95);

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

    useEffect(() => {
        let interval;
        if (isLoading) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= targetProgress) return prev; // 90%까지만 진행
                    return Math.min(prev + Math.random() * 5, targetProgress); // 불규칙하게 증가
                });
            }, 1350); // 1.35초마다 증가
        }
        else {
            setProgress(0);
            setTargetProgress(0);
        }
        return () => clearInterval(interval);
    }, [isLoading, targetProgress]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setUserInputArray(userInputArray.concat([userInput]));
        setIsLoading(true);

        const postDataForModified = {
            parentId: parentId,
            userRequest: userInput,
            articleId: articleId,
            character1: char1.species,
            character2: char2.species,
        }

        setUserInput("");

        try {
            setTargetProgress(30);

            const response1 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/generate/user-modified`, postDataForModified);
            
            const parentConversationId = response1.data._id;
            const postDataForRag = {
                articleId: articleId,
                parentId: parentConversationId,
                character1: char1.species,
                character2: char2.species,
            }

            setProgress(25);
            setTargetProgress(95);
            const response2 = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/generate/rag-modified`, postDataForRag);

            setProgress(100)
            setConversation(response2.data.script);
            setParentId(response2.data._id);
            setConversationId(response2.data._id);

        } catch (error) {
            console.log("conversation 수정 에러: ", error);
        }

        setIsLoading(false);
    };


    return ( 
        <div className={styles.container}>
            <div className={styles.title}>원하는 톤으로 대화를 수정해 봐!</div>

            <div className={styles.mainContentContainer}>
                <div className={isLoading ? styles.conversationLoadingDiv : styles.conversationContainer}>
                    {isLoading ? 
                        <div className={styles.loadingFlexDiv}>
                            <span><strong>RAG</strong>로 배경지식을 채워, 더 똑똑한 대화를 만들어드릴게요 !</span>
                            <div className={styles.progressBarWrapper}>
                                <div className={styles.progressBar} style={{ width: `${progress}%`}}/>
                            </div>
                        </div>: (
                        conversation.map((lineObj, index) => {
                            const [speaker, text] = Object.entries(lineObj)[0];
                            return (
                                <div key={index} className={styles.lineBlock}>
                                    <strong>{speaker==char1.species ? char1.name : char2.name}</strong><br/>
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