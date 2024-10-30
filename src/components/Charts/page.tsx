'use client'
import * as React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import styles from './Charts.module.css'
import { db } from '../../../utils/firebase'
import { useEffect, useState } from 'react'

import { LineChart, PieChart } from '@mui/x-charts'


interface GastosProps {
    id: string
    gasto: string
    valor: string
}

export default function Charts() {
    const [gastos, setGastos] = useState<GastosProps[]>([])
    const [nome, setNome] = useState<string[]>([])
    const [valores, setValores] = useState<number[]>([])

    useEffect(() => {
        const fetchGastos = async () => {
            const data = await getDocs(collection(db, "Gastos"))
            const dataSnapshot = data.docs.map(doc => ({
                id: doc.id,
                gasto: doc.data().gasto,
                valor: doc.data().valor
            }))
            setGastos(dataSnapshot)
            setNome(dataSnapshot.map(gasto => gasto.gasto))
            setValores(dataSnapshot.map(gasto => parseFloat(gasto.valor)))
        }
        fetchGastos()

    }, [])

    return (
        <div className={styles.charts}>
            <h1>Gráficos</h1>
            <div>
                <LineChart
                    series={[
                        { data: valores }
                    ]}
                    xAxis={[{
                        data: nome,
                        scaleType: 'band'
                    }]}
                    height={300}
                    width={400}
                    margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                />
            </div>
            <div>
                <PieChart
                    series={[
                        {
                            data: gastos && gastos.map(gasto => ({
                                id: gasto.id,
                                value: parseFloat(gasto.valor),
                                label: gasto.gasto
                            }))
                        },
                    ]}
                    width={400}
                    height={200}
                    margin={{ top: 0, bottom: 0, left: 0, right: 200 }}
                />
            </div>
        </div>
    )
}