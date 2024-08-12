import BarberShopItem from "../_components/barbershop-item"
// import Header from "../_components/header"
import HeaderBarberShop from "../_components/header-barbershop"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarberShopPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarberShopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams?.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div className="space-y-6">
      <HeaderBarberShop />

      <div className="mx-auto max-w-screen-xl space-y-6 px-5">
        <div className="lg:hidden">
          <Search />
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase text-gray-400">
            Resultados para &quot;{searchParams?.title || searchParams?.service}
            &quot;
          </h2>

          <div className="grid grid-cols-2 gap-4 pb-3 md:grid-cols-3 lg:grid-cols-4">
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
