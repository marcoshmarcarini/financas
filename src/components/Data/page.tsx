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
    const [data, setData] = useState<DataItem[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDocs(collection(db, "Gastos"))
            const dataSnapshot = data.docs.map(doc => ({
                id: doc.id,
                gasto: doc.data().gasto,
                valor: doc.data().valor
            }))
            setData(dataSnapshot)

        }
        fetchData()
    }, [])

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.thead}>
                        <th>ID</th>
                        <th>Gasto</th>
                        <th>Valor</th>
                    </tr>
                    {data && data.map(data => (
                        <tr className={styles.trow} key={data.id}>
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
                    ))}
                </tbody>
            </table>

        </div>
    )
}