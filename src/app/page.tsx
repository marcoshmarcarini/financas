import Data from "@/components/Data/page"
import Gastos from "@/components/Gastos/page"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-[50px]">
      <Gastos />
      <Data />
    </main>
  )
}