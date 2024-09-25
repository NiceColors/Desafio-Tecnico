import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from '../loading/loading.component';
import { MapContainer } from './map.styles';

interface MapComponentProps {
    cep: string; 
}


const MapComponent: React.FC<MapComponentProps> = ({ cep }) => {


    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${GOOGLE_MAPS_API_KEY}`
                );

                if (response.data.status === 'OK') {
                    const location = response.data.results[0].geometry.location;
                    setCoordinates(location);
                } else {
                    setError('Não foi possível renderizar o mapa');
                }
            } catch (error) {
                setError('Erro ao buscar coordenadas');
            }
        };

        fetchCoordinates();
    }, []);

    if (error)
        return <MapContainer><p>{error}</p></MapContainer>


    return (
        <MapContainer>
            {coordinates ? (
                <Map
                    defaultZoom={15}
                    center={coordinates}
                    mapId="ADDRESS_MAP_ID"
                >
                    <AdvancedMarker position={coordinates} />
                </Map>
            ) : (
                <LoadingSpinner />
            )}
        </MapContainer>
    );
};

export default MapComponent;
