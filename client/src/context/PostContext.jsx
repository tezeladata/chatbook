import { createContext, useContext, useState } from "react";

export const PostContext = createContext();

const API_URL = "http://localhost:3000/api";

export const PostProvider = ({children}) => {
    const [ posts, setPosts ] = useState([]);

    const getPosts = async (userId) => {
        try {
            const res = await fetch(`${API_URL}/posts${userId ? `?userId=${userId}` : ""}`, {
                credentials: "include"
            });

            const result = await res.json();

            if (!res.ok){
                throw new Error(result.message);
            }

            setPosts(result.data.posts);
        } catch(err) {
            console.log(err);
        }
    }

    const addPost = async (postObj) => {
        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(postObj),
                credentials: "include"
            });

            const result = await res.json();

            if (!res.ok){
                throw new Error(result.message);
            }

            setPosts([...posts, result])
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <PostContext.Provider value={{getPosts, posts, addPost}}>
            {children}
        </PostContext.Provider>
    )
}

export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePosts must be used within a PostProvider");
    }
    return context;
};