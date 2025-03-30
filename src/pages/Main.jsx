import React from "react"
import { useNavigate } from "react-router-dom"

export default function Main() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Main Page</h1>
            <button onClick={() => navigate("/news")}>Today's News</button>
            <button onClick={() => navigate("/generate")}>Generate</button>
        </>
    )
}