import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  console.log({ barbershops })
  return (
    <div>
      <Header />

      <div className="mx-auto max-w-screen-xl space-y-6 p-5 lg:space-y-12">
        <div className="space-y-6 lg:flex lg:items-baseline lg:gap-16 lg:space-y-12 lg:overflow-hidden">
          <div className="space-y-6 lg:flex lg:w-full lg:max-w-md lg:shrink-0 lg:flex-col">
            <div className="space-y-6 sm:flex sm:items-center sm:gap-8 lg:flex-col lg:items-start lg:gap-0">
              <div className="shrink-0">
                <h2 className="text-xl font-bold">Olá, Felipe</h2>
                <p>Segunda-feira, 05 de agosto.</p>
              </div>

              <div className="sm:w-full lg:pl-1">
                <Search />
              </div>
            </div>

            <div className="flex gap-3 overflow-x-scroll lg:hidden [&::-webkit-scrollbar]:hidden">
              {quickSearchOptions.map((option) => (
                <Button
                  className="gap-2"
                  variant={"secondary"}
                  key={option.title}
                  asChild
                >
                  <Link href={`/barbershops?service=${option.title}`}>
                    <Image
                      alt={option.title}
                      src={option.imageUrl}
                      width={16}
                      height={16}
                    />
                    {option.title}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="relative h-[150px] w-full overflow-hidden rounded-lg sm:h-56 md:h-64 lg:hidden">
              <Image
                alt="Agende nos melhores com FWS Barber"
                src="/banner-01.png"
                fill
                className="object-cover"
              />
            </div>

            {confirmedBookings.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase text-gray-400">
                  Agendamentos
                </h2>
                <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </div>
            )}
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
    </div>
  )
}

export default Home
