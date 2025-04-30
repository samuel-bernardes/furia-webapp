import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/user/UserContext"; // Ajuste o caminho

function AuthCallback() {
    const navigate = useNavigate();
    const { login } = useUserContext(); // Adicione esta linha

    useEffect(() => {
        const run = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");
            const temporary = params.get("temporary");

            if (!token) {
                navigate("/login");
                return;
            }
            // Aguarda a conclusão do login
            await login(token);

            if (temporary === "true") {
                navigate("/cadastro");
            } else {
                navigate("/");
            }
        };

        run();
    }, [navigate, login]);

    return (
        <div>
            <main>
                <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 48 48" />
            </main>
        </div>
    );
}

export default AuthCallback;