import React from "react"
import { useNavigate } from "react-router-dom"

export default function News() {
    const navigate = useNavigate();

    return (
        <>
            <h1>News Page</h1>

            <button onClick={()=>navigate('/')}>Main</button>
        </>
    )
}