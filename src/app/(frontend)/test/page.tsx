import { getPayload } from 'payload'
import config from '@payload-config'
import { getPropertyBySlug } from '@/lib/booking/api'

export default async function TestPage() {
  const payload = await getPayload({ config })

  // Dohvati sve properties
  const properties = await payload.find({
    collection: 'properties',
  })
  const property = await getPropertyBySlug('villa-me-and-you')
  // console.log('Property:', property)
  //const getpropertyId = getPropertyById(propertyId)
  //console.log(getP)

  // Dohvati sve seasons
  const seasons = await payload.find({
    collection: 'seasons',
    depth: 0,
  })

  //console.log(seasons.docs[0].pricing.pricePerNight)

  // Dohvati sve bookings
  const bookings = await payload.find({
    collection: 'bookings',
  })

  // Dohvati sve blocked dates
  const blockedDates = await payload.find({
    collection: 'blocked-dates',
    depth: 0,
  })
  //console.log(blockedDates.docs)
  const blockedDatesall = blockedDates.docs
  blockedDatesall.forEach((blocked) => {
    const start = new Date(blocked.startDate)
    const end = new Date(blocked.endDate)
    // console.log(start, end)
  })

  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Properties</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
          {JSON.stringify(property, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Seasons</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
          {JSON.stringify(seasons.docs, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Bookings</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
          {JSON.stringify(bookings.docs, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Blocked Dates</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
          {JSON.stringify(blockedDates.docs, null, 2)}
        </pre>
      </section>
    </div>
  )
}
