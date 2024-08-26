import React, { useState } from 'react'
import { IonContent, IonPage, IonInput, IonTextarea, IonButton } from '@ionic/react'
import { Camera, CameraResultType } from '@capacitor/camera'
import { Geolocation } from '@capacitor/geolocation'
import { savePlace } from '../services/placesService'
import './Tab1.css'

const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState('')

  // capture image using Camera plugin
  const captureImage = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    })
    setPhoto(image.base64String!)
  }

  // capture gps coordinates using Geolocation plugin
  const captureLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition()
      console.log(`-- gps latitude & longitude:  ${position.coords.latitude}, ${position.coords.longitude}`)
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    } catch (error) {
      console.error('-- Error capturing GPS coordinates:', error)
    }
  }

  // send location to backend api, via the placesService, to be saved in the mongodb database
  const saveLocation = async () => {
    const coordinates = await captureLocation() || { latitude: 0, longitude: 0 }

    const newPlace = {
      name,
      description,
      photo,
      coordinates,
      date: new Date().toISOString()
    }
    await savePlace(newPlace)
    setName('')
    setDescription('')
    setPhoto('')
  }

  return (
    <IonPage>
      <IonContent className="home-content">
        <h1>Save A New SweetSpot</h1>
        <IonInput 
          value={name} 
          placeholder="Enter place name" 
          onIonChange={(e) => setName(e.detail.value!)} 
          className="input-field"
        />
        <IonTextarea 
          value={description} 
          placeholder="Enter a brief description" 
          onIonChange={(e) => setDescription(e.detail.value!)} 
          className="textarea-field"
        />
        <IonButton expand="block" onClick={captureImage} className="action-button">Capture Image</IonButton>
        <IonButton expand="block" onClick={saveLocation} className="action-button">Save Place</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Home