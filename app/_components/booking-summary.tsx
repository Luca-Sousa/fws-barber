import { format } from "date-fns"
import { Card, CardContent } from "./ui/card"
import { ptBR } from "date-fns/locale"
import { Barbershop, BarbershopService } from "@prisma/client"

interface BookingSummaryprops {
  selectedDate: Date
  barbershop: Pick<Barbershop, "name">
  service: Pick<BarbershopService, "name" | "price">
}

const BookingSummary = ({
  selectedDate,
  barbershop,
  service,
}: BookingSummaryprops) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Data</h2>
          <p className="text-sm font-bold">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm font-bold">{format(selectedDate, "HH:mm")}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <p className="text-sm font-bold">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary
