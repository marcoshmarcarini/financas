'use client'

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { redirect } from "next/navigation"
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    User
} from "firebase/auth"
import { auth } from "../../../utils/firebase"


export default function Login() {
    const [user, setUser] = useState<User | null>(null)
    const [email, setEmail] = useState("")
    const [password, setPassowrd] = useState("")
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => {
        const usubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user) // Usuário autenticado
                console.log(user)
            } else {
                // Redireciona para a página de login se o usuário não estiver autenticado
                redirect("/")
            }
        })

        return () => usubscribe()
    }, [router])

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                setUser(user)
                console.log("Usuaário logado: ", user) // Define o usuário autenticado
                redirect("/")
            })
            .catch((error) => {
                setError(error.message)
                console.error("Erro ao fazer login:", error.message)
            })
    }
    if (!user) {
        return (
            <div className={`flex flex-col gap-[50px] items-center justify-center h-screen`}>
                <h1>Você precisa fazer login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form
                    onSubmit={handleLogin}
                    className={`flex flex-col gap-[10px] items-center justify-center`}
                >
                    <div className={`flex flex-col gap-[10px] `}>
                        <label htmlFor="email" className={`hidden`}>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className={`border w-[250px] rounded-md text-center placeholder:text-center text-black placeholder:text-black border-orange-500`}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={`flex flex-col gap-[10px] `}>
                        <label htmlFor="password" className={`hidden`}>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className={`border w-[250px] rounded-md text-center placeholder:text-center text-black placeholder:text-black border-orange-500`}
                            onChange={(e) => setPassowrd(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        className={`border w-[150px] rounded-md text-center placeholder:text-center text-white placeholder:text-black border-orange-500 bg-orange-500 hover:bg-orange-600 transition-colors`}
                        value={`Entrar`}
                    />
                </form>
            </div>
        )
    } else {
        redirect("/")
    }


}