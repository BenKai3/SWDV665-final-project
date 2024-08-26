import React from 'react'
import { IonModal, IonButton, IonContent, IonText, IonImg } from '@ionic/react'
import { Share } from '@capacitor/share'
import { deletePlace } from '../services/placesService'
import './PlaceDetailsModal.css'


const PlaceDetailsModal: React.FC<{ isOpen: boolean; onClose: () => void; place: any }> = ({ isOpen, onClose, place }) => {

//   const sharePlace = async () => {
//     await Share.share({
//       title: place.name,
//       text: place.description,
//       url: `https://maps.google.com/?q=${place.coordinates.lat},${place.coordinates.lng}`,
//     })
//   }

// open the saved location in google maps
const openInGoogleMaps = () => {
    const url = `https://maps.google.com/?q=${place.coordinates.latitude},${place.coordinates.longitude}`
    window.open(url, '_blank')
  }

//   delete the saved place, via placesService, by sending a delete request to the backend api, then close the modal
  const deletePlaceModal = async () => {
    const result = await deletePlace(place._id)
    console.log("deletePlaceModal result: ", result)
    if(result) {
      onClose()
    }
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="modal-content">
        <div className="place-details">
          <IonText className="place-name">Name: {place.name}</IonText>
          { place.description && <IonText className="place-description">Description: {place.description}</IonText> }
          { place.coordinates && <IonText className="place-coordinates">Latitude: {place.coordinates.latitude}, Longitude: {place.coordinates.longitude}</IonText> }
          { place.photo && <IonImg src={`data:image/jpeg;base64,${place.photo}`} className="place-photo"/> }
        </div>
        <div className="modal-actions">
          {/* <IonButton expand="block" onClick={sharePlace} className="modal-button">Share</IonButton> */}
          <IonButton expand="block" onClick={openInGoogleMaps} className="modal-button">Open in Google Maps</IonButton>
          <IonButton expand="block" onClick={deletePlaceModal} className="modal-button">Delete</IonButton>
          <IonButton expand="block" onClick={onClose} className="modal-button">Close</IonButton>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default PlaceDetailsModal