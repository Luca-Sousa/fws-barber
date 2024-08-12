import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, CircleUserRound, MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
import Search from "./search"

const HeaderBarberShop = () => {
  return (
    <Card>
      <CardContent className="mx-auto flex max-w-screen-xl items-center justify-between p-5 lg:items-baseline">
        <Link href="/" className="shrink-0">
          <Image alt="FSW Barber" src="/logo.png" width={120} height={18} />
        </Link>

        <div className="mx-auto hidden w-full max-w-md lg:block xl:max-w-lg 2xl:max-w-xl">
          <Search />
        </div>

        <div className="flex items-center gap-5">
          <Button
            className="hidden justify-start gap-2 md:flex"
            variant="ghost"
          >
            <CalendarIcon size={18} />
            Agendamentos
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="md:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetTrigger asChild>
              <Button variant="default" className="hidden gap-2 md:flex">
                <CircleUserRound size={18} />
                Perfil
              </Button>
            </SheetTrigger>

            <SidebarSheet />
          </Sheet>
        </div>
      </CardContent>
    </Card>
  )
}

export default HeaderBarberShop
