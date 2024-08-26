import React, { useEffect, useState } from 'react'
import { IonContent, IonPage, IonList, IonItem, IonLabel } from '@ionic/react'
import { getPlaces } from '../services/placesService'
import PlaceDetailsModal from '../components/PlaceDetailsModal'
import './Tab2.css'

const List: React.FC = () => {
  const [places, setPlaces] = useState<any[]>([])
  const [selectedPlace, setSelectedPlace] = useState<any>(null)

  // use useEffect to fetch the current places list from the backend api upon load
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const placesData = await getPlaces()
        console.log('Fetched places:', placesData)
        setPlaces(Array.isArray(placesData) ? placesData : [])  // Ensure it's an array
      } catch (error) {
        console.error('Failed to fetch places:', error)
        setPlaces([])  // Set to an empty array in case of error
      }
    }
    fetchPlaces()
  }, [])

  // open the modal to display the details of a certain saved place
  const openModal = (place: Place) => {
    setSelectedPlace(place)
  }

  return (
    <IonPage>
      <h1>My Sweet Spots</h1>
      <IonContent className="list-content">
        {places.length > 0 ? (
          <IonList>
            {places.map((place, index) => (
              <IonItem key={index} onClick={() => openModal(place)} className="list-item">
                <IonLabel>{place.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <p className="no-places-text">No places found.</p>
        )}
        {selectedPlace && (
          <PlaceDetailsModal
            isOpen={!!selectedPlace}
            onClose={() => setSelectedPlace(null)}
            place={selectedPlace}
          />
        )}
      </IonContent>
    </IonPage>
  )
}

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

export default List