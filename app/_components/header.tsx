import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, CircleUserRound, MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="mx-auto flex max-w-screen-xl items-center justify-between p-5">
        <Link href="/">
          <Image alt="FSW Barber" src="/logo.png" width={120} height={18} />
        </Link>

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

export default Header
