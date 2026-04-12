import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useNavigate } from "react-router-dom";


export default function BackendLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const login = async () => {
        const { data: admin, error } = await supabase
            .from("admins")
            .select("*")
            .eq("email", email)
            .eq("password", password)
            .maybeSingle()

        if (error || !admin) {
            alert("Sai tài khoản")
            return
        }

        // lưu session admin
        localStorage.setItem("admin", "true")

        navigate("/admin/dashboard")
    }

    return (
        <div>
            <h2>Admin Login</h2>

            <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={login}>Login</button>
        </div>
    )
}