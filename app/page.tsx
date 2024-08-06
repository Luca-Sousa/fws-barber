import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

const Home = () => {
  return (
    <div>
      <Header />
      <div className="space-y-6 p-5">
        <div>
          <h2 className="text-xl font-bold">Olá, Felipe</h2>
          <p>Segunda-feira, 05 de agosto.</p>
        </div>

        <div className="flex items-center gap-2">
          <Input placeholder="Search" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative h-[150px] w-full overflow-hidden rounded-lg">
          <Image
            alt="Agende nos melhores com FWS Barber"
            src="/banner-01.png"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="uppercase">Agendamentos</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
