import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
    const { user, logOut } = useAuth();
    return (
        <header className="bg-blue-600 text-white shadow-md">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="text-xl font-bold">
                    <Link to="/">MyApp</Link>
                </div>
                <ul className="flex space-x-6 items-center">
                    <li>
                        <Link className="hover:text-gray-200 transition" to="/">Home</Link>
                    </li>

                    {user ? (
                        <>
                            <li>
                                <Link className="hover:text-gray-200 transition" to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link className="hover:text-gray-200 transition" to="/posts">Posts</Link>
                            </li>
                            <li>
                                <button
                                    onClick={logOut}
                                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                                >
                                    Log out
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className="hover:text-gray-200 transition" to="/login">Login</Link>
                            </li>
                            <li>
                                <Link className="hover:text-gray-200 transition" to="/signup">Signup</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Nav;
