import { Badge } from "../_components/ui/badge"
import { Avatar, AvatarImage } from "../_components/ui/avatar"
import { Card, CardContent } from "./ui/card"

// TODO: Receber agendamento como prop
const BookingItem = () => {
  return (
    <>
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
    </>
  )
}

export default BookingItem
