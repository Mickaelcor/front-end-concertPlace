import PhotosUploader from "../../PhotosUploader.jsx";
import Perks from "../../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../../AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [dateConcert, setDateConcert] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(1);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);
    // Fonction css h2 du formulaire
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    // fonction css p du formulaire
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    // fonction combinant le h2 et p afin de gagner en lisibilité 
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    // fonction pour ajouter un new concert
    async function savePlace(ev) {
        // PreventDefault affin d'annuler l'action par défaut (rechargement de la page) lors de la soumission du formulaire
        //Permet de traiter les donnéées sans recharger la page
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price, dateConcert
        };
        if (id) {
            //update
            await axios.put('/places', {
                id, ...placeData

            });
            setRedirect(true);
        } else {
            //new place
            await axios.post('/places', placeData);
            setRedirect(true);
        }

    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }


    return (
        <div className="lg:px-64 xl:px-64 2xl:px-96">
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Titre', 'titre de votre concert, qui doit être accrocheur')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="titre, par exemple: Mon fabuleux concert" />

                {preInput('Adresse', 'adresse ou va se derouler le concert')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="adresse du concert" />

                {preInput('Date', 'Date du concert')}
                <input type="date" value={dateConcert} onChange={ev => setDateConcert(ev.target.value)} className="border-2 border-black rounded-xl px-4 py-4" />

                {preInput('Photos', 'quelques photos de vos concerts/etablissements')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'description à propos du concert')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                {preInput('Caractéristiques', 'caractéristiques du lieu ou se déroule le concert')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {/* Appel d'un component perks,  selected et onChange afin de faire passer la selection dans le component*/}
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {preInput('Infos supplémentaires', 'conditions particulières ..')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                {preInput('Horaire & Nombre de places', 'horaire du concert, et nombre de places disponible à la reservation')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Heure de début</h3>
                        <input type="text"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder="20:00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Heure de fin</h3>
                        <input type="text"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder="22:00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Nombre de places</h3>
                        <input type="number"
                            value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Prix par personne</h3>
                        <input type="number"
                            value={price}
                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <button className="primary mt-4">Enregister</button>
            </form>
        </div>
    );
}