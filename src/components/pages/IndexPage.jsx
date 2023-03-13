import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link key={place._id} to={'/place/' + place._id}>
                    <div className="bg-gray-500 border-2 mb-2 rounded-2xl flex hover:scale-105">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:5001/uploads/' + place.photos?.[0]} alt="" />
                        )}

                    </div>
                    <h2 className="font-bold">{place.title}</h2>
                    <h3 className="flex text-sm font-thin gap-1">
                        En concert le:
                        <div>
                            {format(new Date(place.dateConcert), 'dd-MM-yyyy')}
                        </div>
                    </h3>
                    <h4 className="text-sm text-gray-500">{place.address}</h4>
                    <div className="mt-1">
                        <span className="font-bold">€{place.price}</span> par personne
                    </div>
                </Link>
            ))}
        </div>
    );
}