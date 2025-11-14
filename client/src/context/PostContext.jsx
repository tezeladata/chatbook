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

    const deletePost = async (postId) => {
        try {
            const res = await fetch(`${API_URL}/posts/${postId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if(!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            }

            setPosts(posts.filter(post => post._id !== postId));

            alert('Post deleted succesfully!');
        } catch(err) {
            console.log(err);
        }
    }

    const updatePost = async (data, postId) => {
        try {
            const res = await fetch(`${API_URL}/posts/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            const result = await res.json();

            if (!res.ok){
                throw new Error(result.message);
            }

            const index = posts.findIndex(post => post._id === postId);
            const copyArr = [...posts];
            copyArr.splice(index, 1, result);
            setPosts(copyArr);

            alert("Post updated successfully")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <PostContext.Provider value={{getPosts, posts, addPost, deletePost, updatePost}}>
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