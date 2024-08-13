"use client"

import { Badge } from "../_components/ui/badge"
import { Avatar, AvatarImage } from "../_components/ui/avatar"
import { Card, CardContent } from "./ui/card"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import BookingSummary from "./booking-summary"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: { barbershop: true }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar a reserva. Tente Novamente!")
    }
  }

  return (
    <>
      <Sheet>
        <SheetTrigger className="w-full min-w-[90%]">
          <Card className="min-w-[90%]">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge
                  className="w-fit"
                  variant={isConfirmed ? "default" : "secondary"}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <h3 className="font-semibold">{booking.service.name}</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>

                  <p className="text-sm">{barbershop.name}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-l-2 px-5">
                <p className="text-sm capitalize">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>

        <SheetContent className="w-[85%] space-y-6">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>

          <div className="relative flex h-[180px] w-full items-end">
            <Image
              alt={`Mapa da Barbearia ${barbershop.name}`}
              src="/map.png"
              fill
              className="rounded-xl object-cover"
            />

            <Card className="z-50 mx-4 mb-3 w-full rounded-xl">
              <CardContent className="flex items-center gap-3 px-5 py-3">
                <Avatar className="size-12">
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>

                <div>
                  <h2 className="text-bold">{barbershop.name}</h2>
                  <p className="truncate text-xs text-gray-400">
                    {booking.service.barbershop.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            <BookingSummary
              barbershop={barbershop}
              service={booking.service}
              selectedDate={booking.date}
            />
          </div>

          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>

          <SheetFooter>
            <div className="flex items-center gap-3">
              <SheetClose asChild>
                <Button variant="secondary" className="w-full">
                  Voltar
                </Button>
              </SheetClose>
              {isConfirmed && (
                <AlertDialog>
                  <AlertDialogTrigger asChild className="w-full">
                    <Button variant="destructive" className="w-full">
                      Cancelar Reserva
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="w-[90%]">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>

                      <AlertDialogDescription>
                        Tem certeza que deseja cancelar esse agendamento?
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex flex-row items-center gap-3">
                      <AlertDialogCancel className="mt-0 w-full rounded-lg">
                        Voltar
                      </AlertDialogCancel>

                      <AlertDialogAction
                        className="w-full rounded-lg"
                        onClick={handleCancelBooking}
                      >
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default BookingItem
