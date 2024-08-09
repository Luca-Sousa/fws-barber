import BarberShopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarberShopPageProps {
  searchParams: {
    search: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarberShopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  })

  return (
    <div className="space-y-6">
      <Header />

      <div className="space-y-6 px-5">
        <Search />

        <div className="space-y-3 text-sm font-bold uppercase text-gray-400">
          <h2>Resultados para &quot;{searchParams.search}&quot;</h2>

          <div className="grid grid-cols-2 gap-4 pb-3">
            {barbershops.map((barbershop) => (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
