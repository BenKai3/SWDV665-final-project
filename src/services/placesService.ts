console.log('-- placesService.ts activated.')

const uri = 'http://localhost:8080'
// const uri = 'https://0c02-2601-603-1001-47d0-4ca5-cb3e-11c9-5f72.ngrok-free.app'

// send a GET reqeust, retreiving the current list of places from the backend api
export async function getPlaces() {
  const response = await fetch(`${uri}/places`)
  return await response.json()
}

// send a POST request, adding a new place via the backend api
export async function savePlace(place: Place) {
  const response = await fetch(`${uri}/places`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(place),
  })
  return await response.json()
}

// send a DELETE request to the backend api, deleting the currently loaded place
export async function deletePlace(placeId: string) {
  const response = await fetch(`${uri}/places/${placeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  console.log("-- DELETE response.ok: ", response.ok)
  return await response.ok
}

// create a Place type for typescript, to allow for place arguments
interface Place {
  name: string
  description?: string
  coordinates: {
    latitude: number
    longitude: number
  }
  photo?: string
  date: string
}