import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const { signUp } = useAuth();

    const handleSubmit = e => {
        e.preventDefault();
        const formObj = {
            fullname: e.target.fullname.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
        signUp(formObj);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    required
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;