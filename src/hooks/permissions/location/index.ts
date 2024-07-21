import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

interface LocationData {
    coords: {
        latitude: number;
        longitude: number;
        altitude: number;
        accuracy: number;
        altitudeAccuracy: number | null;
        heading: number | null;
        speed: number | null;
    };
    timestamp: number;
}

interface UseLocationReturn {
    location: LocationData | null;
    error: string | null;
}

const useLocation = (): UseLocationReturn => {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android' && !Device.isDevice) {
                setError(
                    'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
                );
                return;
            }

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            if (location.coords.altitudeAccuracy === null) {
                location.coords.altitudeAccuracy = 0;
            }
            setLocation(location as LocationData);
        })();
    }, []);

    return { location, error };
};

export { useLocation };
