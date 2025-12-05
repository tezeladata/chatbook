import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();

    const handleSubmit = e => {
        e.preventDefault();
        const formObj = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        login(formObj);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>

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
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;