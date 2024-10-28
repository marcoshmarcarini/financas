'use client'
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { db, auth } from "../../../utils/firebase"
import { addDoc, collection } from 'firebase/firestore'
import styles from './Gastos.module.css'


/* imports Chartsjs */

interface GastosProps {
    gasto: string
    valor: string
}

export default function Gastos() {
    const [gastos, setGastos] = useState<GastosProps>({
        gasto: '',
        valor: ''
    })


    const route = useRouter()
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!gastos.gasto || !gastos.valor) {
            console.error('Por favor, preencha todos os campos.')
            return; // Impede o envio se os campos estiverem vazios
        }

        const valorNumerico = parseFloat(gastos.valor)

        if (isNaN(valorNumerico) || valorNumerico <= 0) {
            console.error('O valor deve ser um número.')
            return
        }

        await addDoc(collection(db, 'Gastos'), {
            gasto: gastos.gasto,
            valor: valorNumerico,
        })

        setGastos({ gasto: '', valor: '' })



    }

    useEffect(() => {
        const usubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                route.push('/')
            }
        })
        return () => usubscribe()
    }, [route])

    return (
        <div className={`px-5`}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    onChange={(e) => setGastos({ ...gastos, gasto: e.target.value })}
                    id="gasto"
                    placeholder="Gasto"
                    className={styles.formControl}
                />
                <input
                    type="text"
                    onChange={(e) => setGastos({ ...gastos, valor: e.target.value })}
                    id="valor"
                    placeholder="Valor"
                    className={styles.formControl}
                />
                <input
                    type="submit"
                    value={`+`}
                    className={styles.buttonSubmit}
                />
            </form>
        </div>
    )
}