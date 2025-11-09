import { useAuth } from "../context/AuthContext"

const Profile = () => {
    const {user} = useAuth();
    return (
        <main>
            <p>My email: {user.email}</p>
            <p>My fullname: {user.fullname}</p>
            <p>Verified: {user.isVerified ? "Yes" : "No"}</p>
        </main>
    )
};

export default Profile;