import { EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  console.log({ barbershops })
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

        <div className="flex gap-3 overflow-x-scroll [&&::-webkit-scrollbar]:hidden">
          <Button className="gap-2" variant={"secondary"}>
            <Image src="/cabelo.svg" alt="Cabelo" width={16} height={16} />
            Cabelo
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image src="/barba.svg" alt="Cabelo" width={16} height={16} />
            Barba
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image src="/acabamento.svg" alt="Cabelo" width={16} height={16} />
            Acabamento
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <FootprintsIcon size={16} />
            Pézinho
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <EyeIcon size={16} />
            Sobrancelha
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

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>

          <Card>
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge className="w-fit">Confirmado</Badge>
                <h3 className="font-semibold">Corte de Cabelo</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                  </Avatar>

                  <p className="text-sm">Barbearia FWS</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-l-2 px-5">
                <p className="text-sm">Agosto</p>
                <p className="text-2xl">05</p>
                <p className="text-sm">20:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>

      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              @ 2023 Copyright <span className="font-bold">FWS Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
