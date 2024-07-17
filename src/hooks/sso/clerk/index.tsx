import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { OAuthStrategy } from '@clerk/types';
import * as Linking from 'expo-linking';

export const useSSOLogin = ({ strategy }: { strategy: OAuthStrategy }) => {
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
      console.log('Starting OAuth flow...');
      const redirectUrl = Linking.createURL('/', { scheme: 'myapp' });
      console.log('Redirect URL:', redirectUrl);

      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl,
      });

      console.log('OAuth flow result:', { createdSessionId, setActive });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        console.log('Session set active:', createdSessionId);
      } else {
        console.log('Session not created. Handle signIn or signUp steps here.');
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [startOAuthFlow]);

  return ssoLogin;
};

export { OAuthStrategy };
