import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { OAuthStrategy } from '@clerk/types';
import * as Linking from 'expo-linking';

export const useSSOLogin = ({
  strategy,
  redirectURL = '/',
  scheme = 'myapp',
}: {
  strategy: OAuthStrategy;
  redirectURL?: string;
  scheme?: string;
}) => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  const { startOAuthFlow } = useOAuth({ strategy: strategy });

  const ssoLogin = React.useCallback(async () => {
    try {
      const redirectUrl = Linking.createURL(redirectURL, { scheme: scheme });
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl,
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [redirectURL, scheme, startOAuthFlow]);

  return ssoLogin;
};

export { OAuthStrategy };
