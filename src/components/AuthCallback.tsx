import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/user/UserContext";
import UsersRequest from "../services/endpoints/users/Users.request";
function AuthCallback() {
    const navigate = useNavigate();
    const { login } = useUserContext();

    useEffect(() => {
        const run = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");
            const temporary = params.get("temporary");

            if (!token) {
                navigate("/login");
                return;
            }
            sessionStorage.setItem("token", token);

            if (temporary === "true") {
                navigate("/cadastro");
            } else {
                navigate("/");
            }
        };

        run();
    }, [login, navigate]);

    return (
        <div className="text-white p-4">
            Processando login...
        </div>
    );
}

export default AuthCallback;
