'use client'
import { FormEvent, useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../../utils/firebase"

import { useRouter } from "next/navigation"

interface userProps {
    email: string
    password: string
}

export default function Register() {
    const [user, setUser] = useState<userProps>({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)
    const route = useRouter()

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("Usuário Criado: ", user)
            })
            .catch((error) => {
                setError(error.message)
                console.error("Erro ao criar usuário: ", error.message)
            })
        route.push('/login')

    }

    return (
        <div className={`flex flex-col gap-[50px] items-center justify-center h-screen`}>
            <h1>Cadastre-se</h1>
            <form
                onSubmit={handleRegister}
                className={`flex flex-col gap-[10px] items-center justify-center`}
            >
                <div className={`flex flex-col gap-[10px] `}>
                    <label htmlFor="email" className={`hidden`}>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className={`border w-[250px] rounded-md text-center placeholder:text-center text-black placeholder:text-black border-orange-500`}
                    />
                </div>
                <div className={`flex flex-col gap-[10px]`}>
                    <label htmlFor="password" className={`hidden`}>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className={`border w-[250px] rounded-md text-center placeholder:text-center text-black placeholder:text-black border-orange-500`}
                    />
                </div>
                <button
                    type="submit"
                    className={`border w-[150px] rounded-md text-center placeholder:text-center text-white placeholder:text-black border-orange-500 bg-orange-500 hover:bg-orange-600 transition-colors`}
                >
                    Cadastrar
                </button>
            </form>
            {error && <p className={`text-red-500 text-xl py-5 transition-all animate-pulse`}>{error}</p>}
        </div>
    )
}
