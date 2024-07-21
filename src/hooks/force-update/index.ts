import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

import { appVersion } from '@/lib/app-version';

export const useForceUpdate = ({ versionInfoUrl, appStoreLink, playStoreLink }: {
    versionInfoUrl: string;
    appStoreLink: string;
    playStoreLink: string;
}) => {
    const [isUpdateRequired, setIsUpdateRequired] = useState<boolean>(false);
    const [storeLink, setStoreLink] = useState<string>('');

    useEffect(() => {
        const checkForUpdates = async () => {
            try {
                const response = await fetch(versionInfoUrl);
                const { androidVersion, iosVersion }: {
                    androidVersion: string;
                    iosVersion: string;
                } = await response.json();

                const latestVersion = Platform.OS === 'ios' ? iosVersion : androidVersion;
                const link = Platform.OS === 'ios' ? appStoreLink : playStoreLink;

                if (appVersion !== latestVersion) {
                    setIsUpdateRequired(true);
                    setStoreLink(link);
                }
            } catch (error) {
                console.error('Error checking app version: ', error);
            }
        };

        checkForUpdates();
    }, [versionInfoUrl, appStoreLink, playStoreLink]);

    return { isUpdateRequired, storeLink };
};
