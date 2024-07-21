/**
 * 
 * npx expo install expo-tracking-transparency
 * 
 * app.config.js
 * 
    * {
    "expo": {
        "plugins": [
        [
            "expo-tracking-transparency",
            {
            "userTrackingPermission": "This identifier will be used to deliver personalized ads to you."
            }
        ]
        ]
    }
    }

    @see more: https://docs.expo.dev/versions/latest/sdk/tracking-transparency/
 */

import { useState, useEffect } from 'react';
import { requestTrackingPermissionsAsync, PermissionStatus } from 'expo-tracking-transparency';

type TrackingTransparencyHook = (callbacks?: {
    onGranted?: () => void;
    onDenied?: () => void;
    onUndetermined?: () => void;
}) => PermissionStatus;

/**
 * Custom hook to handle tracking transparency permission.
 * 
 * @param {object} callbacks - Object containing callback functions for each permission status.
 * @returns {PermissionStatus} status - The current tracking permission status.
 */
const useTrackingTransparency: TrackingTransparencyHook = (callbacks) => {
    const [status, setStatus] = useState<PermissionStatus>(PermissionStatus.UNDETERMINED);

    useEffect(() => {
        (async () => {
            const { status } = await requestTrackingPermissionsAsync();
            setStatus(status);

            switch (status) {
                case PermissionStatus.GRANTED:
                    if (callbacks?.onGranted) {
                        callbacks.onGranted();
                    }
                    break;
                case PermissionStatus.DENIED:
                    if (callbacks?.onDenied) {
                        callbacks.onDenied();
                    }
                    break;
                case PermissionStatus.UNDETERMINED:
                    if (callbacks?.onUndetermined) {
                        callbacks.onUndetermined();
                    }
                    break;
                default:
                    break;
            }
        })();
    }, [callbacks]);

    return status;
};

export { useTrackingTransparency };
