import { Link } from "react-router"
import { useAuth } from "../context/AuthContext";

const Nav = () => {
    const {user} = useAuth();
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>

                    {
                        user ? (
                            <>
                                <li><Link to={"/profile"}>Profile</Link></li>
                                <li><Link to={"/posts"}>Posts</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to={"/login"}>Login</Link></li>
                                <li><Link to={"/signup"}>Signup</Link></li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
};

export default Nav