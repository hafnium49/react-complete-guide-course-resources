import { useRef, useState, useEffect } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

// store local values in initialization code
const storedIDs = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIDs.map((id) => 
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  // // store local values in initialization code
  // const storedIDs = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  // const storedPlaces = storedIDs.map((id) => 
  //   AVAILABLE_PLACES.find((place) => place.id === id)
  // );


  // const modal = useRef();
  const selectedPlace = useRef();
  const [modelIsOpen, setModelIsOpen] = useState(false);
  // const [availablePlaces, setAvailablePlaces] = useState(AVAILABLE_PLACES);
  // const [pickedPlaces, setPickedPlaces] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  // // local storage does not use useEffect because it does not create an infinite loop
  // useEffect(() => {
  //   const storedIDs = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  //   const storedPlaces = storedIDs.map((id) => 
  //     AVAILABLE_PLACES.find((place) => place.id === id)
  //   );
  //   // console.log(storedPlaces);
  //   setPickedPlaces(storedPlaces);
  // }, []); // empty dependency array to run only once on mount
  // // redundant usage of useEffect because local storage executes only once on mount

  // runs after the component renders
  useEffect(() => {
    // to get user location using a callback function
    // side effect
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES, 
        position.coords.latitude, 
        position.coords.longitude);
      // console.log(position);
      setAvailablePlaces(sortedPlaces);
    });
  }, []); // empty dependency array to run only once on mount
  // runs only when the dependency array changes
  // avoids infinite loop

  // to get user location using a callback function
  // side effect
  // navigator.geolocation.getCurrentPosition((position) => {
  //   const sortedPlaces = sortPlacesByDistance(
  //     AVAILABLE_PLACES, 
  //     position.coords.latitude, 
  //     position.coords.longitude);
  //   // console.log(position);
  //   setAvailablePlaces(sortedPlaces); // causes infinite loop
  // });


  function handleStartRemovePlace(id) {
    // modal.current.open();
    setModelIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();
    setModelIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    // local storage, another side effect which does not need useEffect because it will not create an infinite loop
    const storedIDs = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedIDs.indexOf(id)===-1) {
      localStorage.setItem(
        'selectedPlaces', 
        JSON.stringify([id, ...storedIDs])
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setModelIsOpen(false);
    // local storage
    const storedIDs = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    const updatedIDs = storedIDs.filter((id) => id !== selectedPlace.current);
    localStorage.setItem(
      'selectedPlaces', 
      JSON.stringify(updatedIDs)
    );
  }

  return (
    <>
      <Modal open={modelIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          // places={AVAILABLE_PLACES}
          places={availablePlaces}
          fallbackText="Sorting places by your location..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
