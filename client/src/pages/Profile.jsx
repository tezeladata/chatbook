import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";
import Posts from "./Posts";

const Profile = () => {
    const { user } = useAuth();
    const { addPost } = usePosts();

    const handleSubmit = e => {
        e.preventDefault();

        const formObj = {
            title: e.target.title.value,
            content: e.target.content.value,
            userId: user._id,
        };

        addPost(formObj);
    };

    return (
        <main className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Profile Page</h1>

            <section className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">User Info</h2>
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Full Name:</span> {user.fullname}</p>
                <p><span className="font-semibold">Verified:</span> {user.isVerified ? "Yes" : "No"}</p>
            </section>

            <section className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Add Post</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        required
                        className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                        name="content"
                        placeholder="Content"
                        required
                        className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
                <Posts userId={user._id} />
            </section>
        </main>
    );
};

export default Profile;