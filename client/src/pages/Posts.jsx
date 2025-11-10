import { useEffect } from "react";
import { usePosts } from "../context/PostContext"
import { useAuth } from "../context/AuthContext";

const Posts = ({userId}) => {
    const {posts, getPosts} = usePosts();

    useEffect(() => {
        getPosts(userId);
    }, [])

    return (
        <ul>

            {
                !posts ? "No posts found" : posts.map(post => {
                    return (
                        <li key={post._id}>
                            <h3>{post.title}</h3>
                            <p>Created by: {post.fullname}</p>
                            <p>Content: {post.content}</p>
                        </li>
                    )
                })
            }

        </ul>
    )
};

export default Posts;