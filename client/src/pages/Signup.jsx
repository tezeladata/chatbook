import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const {signUp} = useAuth();

    const handleSubmit = e => {
        e.preventDefault();

        const formObj = {
            fullname: e.target.fullname.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        signUp(formObj);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>

            <input type="text" name="fullname" placeholder="Please enter fullname" required />
            <input type="email" name="email" placeholder="Please enter email" required />
            <input type="password" name="password" placeholder="Please enter password" required />

            <button type="submit">Signup</button>
        </form>
    )
};

export default Signup