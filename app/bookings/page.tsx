import { notFound } from "next/navigation"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { getServerSession } from "next-auth"
import BookingItem from "../_components/booking-item"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludedBookings } from "../_data/get-concluded-bookings"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    // TODO: MOSTRAR POP-UP DE LOGIN
    return notFound()
  }
  const confirmedBookings = await getConfirmedBookings()
  const concludeBookings = await getConcludedBookings()

  return (
    <>
      <Header />

      <div className="space-y-5 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length === 0 && concludeBookings.length === 0 && (
          <h2 className="text-gray-400">Você não tem agendamentos.</h2>
        )}

        {confirmedBookings.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>

            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </div>
        )}

        {concludeBookings.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>

            {concludeBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Bookings
