import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import HeaderBarberShop from "@/app/_components/header-barbershop"
import { Avatar } from "@/app/_components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Card, CardContent } from "@/app/_components/ui/card"

interface BarberShopPageprops {
  params: { id: string }
}

const BarberShopPage = async ({ params }: BarberShopPageprops) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="hidden lg:block">
        <HeaderBarberShop />
      </div>

      <div className="lg:mx-4 lg:my-8 lg:flex lg:gap-8 xl:mx-0">
        <div className="lg:flex-1">
          <div className="relative h-[250px] w-full lg:h-[450px] xl:h-[550px]">
            <Image
              alt={barbershop?.name}
              src={barbershop?.imageUrl}
              fill
              className="object-cover lg:rounded-lg"
            />

            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-3 lg:hidden"
              asChild
            >
              <Link href={"/"}>
                <ChevronLeftIcon />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-3"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>

              <SidebarSheet />
            </Sheet>
          </div>

          <div className="space-y-3 border-b p-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-3 lg:px-0">
            <div className="space-y-3">
              <h1 className="text-xl font-bold sm:text-2xl">
                {barbershop.name}
              </h1>

              <div className="flex items-center gap-2">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm">{barbershop?.address}</p>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 sm:flex-col sm:rounded-lg sm:bg-secondary sm:px-3 sm:py-1">
              <div className="flex items-center gap-2">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-sm sm:text-lg sm:font-bold">5,0</p>
              </div>

              <p className="text-sm">(499 avaliações)</p>
            </div>
          </div>

          <div className="space-y-2 border-b p-5 lg:hidden">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Sobre nós
            </h2>
            <p className="text-justify text-sm">{barbershop?.description}</p>
          </div>

          <div className="space-y-3 border-b p-5 lg:border-0 lg:px-0">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Serviços
            </h2>

            <div className="grid gap-3 md:grid-cols-2 md:space-y-0 lg:max-w-[640px] lg:grid-cols-1 xl:max-w-full xl:grid-cols-2">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  barbershop={barbershop}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-3 border-b p-5 sm:grid-cols-2 lg:hidden">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>

        <Card className="h-fit border-none">
          <CardContent className="hidden w-96 flex-col rounded-lg p-4 lg:flex">
            <div className="relative h-[180px] w-full">
              <Image
                alt="Mapa da Barbearia"
                src="/map-barber.png"
                fill
                className="rounded-lg object-cover"
              />

              <div className="absolute left-1/2 top-3/4 flex max-w-sm -translate-x-1/2 -translate-y-1/2 gap-3 rounded-lg bg-secondary px-4 py-2">
                <Avatar className="size-12">
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>

                <div>
                  <h2 className="">{barbershop.name}</h2>
                  <p className="truncate text-sm text-gray-400">
                    {barbershop.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 border-b py-5">
              <h2 className="uppercase">Sobre nós</h2>
              <p className="text-justify text-sm text-gray-400">
                {barbershop?.description}
              </p>
            </div>

            <div className="space-y-3 border-b py-5">
              {barbershop.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
              ))}
            </div>

            <div className="flex flex-col gap-2 border-b py-5 text-sm font-light">
              <div className="flex justify-between">
                <span className="text-gray-400">Segunda-Feira</span>
                <span>Fechado</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Terça-Feira</span>
                <span>09:00 - 21:00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Quarta-Feira</span>
                <span>09:00 - 21:00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Quinta-Feira</span>
                <span>09:00 - 21:00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Sexta-Feira</span>
                <span>09:00 - 21:00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Sábado</span>
                <span>09:00 - 21:00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Domingo</span>
                <span>Fechado</span>
              </div>
            </div>

            <div className="flex justify-between py-8">
              <p className="text-sm">Em parceria com</p>

              <Link href="/" className="shrink-0">
                <Image
                  alt="FSW Barber"
                  src="/logo.png"
                  width={120}
                  height={18}
                />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BarberShopPage
