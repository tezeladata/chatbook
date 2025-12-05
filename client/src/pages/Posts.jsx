import { useEffect, useState } from "react";
import { usePosts } from "../context/PostContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Posts = ({ userId }) => {
    const { posts, getPosts, deletePost, updatePost } = usePosts();
    const { user } = useAuth();
    const [updatingPostId, setUpdatingPostId] = useState(null);

    useEffect(() => {
        getPosts(userId);
    }, []);

    const handleSubmit = (e, postId) => {
        e.preventDefault();
        const data = {
            title: e.target.title.value,
            content: e.target.content.value,
        };
        setUpdatingPostId(null);
        updatePost(data, postId);
    };

    return (
        <ul className="flex flex-col gap-6">
            {!posts || posts.length === 0 ? (
                <p className="text-gray-500">No posts found.</p>
            ) : (
                posts.map(post => (
                    <li key={post._id} className="bg-gray-50 p-4 rounded shadow">
                        <p className="text-sm text-gray-600 mb-2">Created By: {post.fullname}</p>

                        {updatingPostId === post._id ? (
                            <form onSubmit={e => handleSubmit(e, post._id)} className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={post.title}
                                    required
                                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <textarea
                                    name="content"
                                    defaultValue={post.content}
                                    required
                                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <div className="flex gap-2">
                                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit</button>
                                    <button type="button" onClick={() => setUpdatingPostId(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <p className="mb-2">{post.content}</p>

                                {user._id === userId && (
                                    <div className="flex gap-2">
                                        <button onClick={() => deletePost(post._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                                        <button onClick={() => setUpdatingPostId(post._id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Update</button>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))
            )}
        </ul>
    );
};

export default Posts;
