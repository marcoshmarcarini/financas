'use client'

import { useEffect, useState } from "react"
import { db } from "../../../utils/firebase"
import styles from "./Data.module.css"
import { collection, getDocs } from "firebase/firestore"

interface DataItem {
    id: string
    gasto: string
    valor: string
}

export default function Data() {
    const [data, setData] = useState<DataItem | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDocs(collection(db, "Gastos"))

            setData({
                id: data.docs[0].id,
                gasto: data.docs[0].data().gasto,
                valor: data.docs[0].data().valor
            })
            console.log(data)
        }
        fetchData()
    }, [])

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <td>ID</td>
                    <td>Gasto</td>
                    <td>Valor</td>
                </thead>
                {data && (
                    <tr className={styles.trow}>
                        <td className={styles.tdata}>
                            {data.id}
                        </td>
                        <td className={styles.tdata}>
                            {data.gasto}
                        </td>
                        <td className={styles.tdata}>
                            {parseFloat(data.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </td>
                    </tr>
                )}
            </table>

        </div>
    )
}