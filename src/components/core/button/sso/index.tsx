import * as React from 'react';
import { Pressable, ViewStyle, StyleProp, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
/** Utils */
import { cn } from '@/lib/cn';

/**Components and hooks */
import { Icon as FontAwesome, Ionicon } from '@/components/core/icon';
import { Text } from '@/components/core/text';
import { useSSOLogin, OAuthStrategy } from '@/hooks/sso';

const buttonVariants = cva('group flex items-center justify-center', {
  variants: {
    size: {
      default: 'h-12 px-5 py-3',
      compact: 'h-12 w-12',
    },
    radius: {
      none: '',
      sm: 'rounded-sm',
      default: 'rounded-lg',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      xxl: 'rounded-2xl',
      xxxl: 'rounded-3xl',
      full: 'rounded-[99999]',
    },
  },
  defaultVariants: {
    size: 'default',
    radius: 'default',
  },
});

type SocialMethod = keyof typeof socialMethods;
type ValidIconFormats = {
  [K in SocialMethod]: keyof (typeof socialMethods)[K]['icon'];
};

type ButtonProps<T extends SocialMethod> = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    style?: StyleProp<ViewStyle>;
    socialMethod: T;
    iconFormat?: ValidIconFormats[T];
    iconSize?: number;
    redirectURL?: string;
    schema?: string;
  };

const SSOButton = <T extends SocialMethod>(
  {
    className,
    size,
    socialMethod,
    radius,
    iconSize = 26,
    iconFormat,
    redirectURL,
    schema,
    ...props
  }: ButtonProps<T>,
  ref: React.Ref<React.ElementRef<typeof Pressable>>
) => {
  const method = socialMethods[socialMethod];
  const ssoLogin = useSSOLogin({
    strategy: method.strategy as OAuthStrategy,
    redirectURL: redirectURL,
    scheme: schema,
  });

  if (!method) {
    console.error(`Unknown social method: ${socialMethod}`);
    return null;
  }

  // Ensure method.icon is properly typed
  type IconType = {
    name: string;
    iconSet: string;
  };
  const methodIcon = method.icon as unknown as {
    [key: string]: IconType;
  };

  // Use 'round' as the default format, and fall back to 'plain' if 'round' is not available
  const defaultIconFormat: keyof typeof methodIcon = 'round' in methodIcon ? 'round' : 'plain';
  const actualIconFormat: keyof typeof methodIcon =
    (iconFormat as keyof typeof methodIcon) || defaultIconFormat;

  const icon = methodIcon[actualIconFormat];
  const isCompact = size === 'compact';
  const Icon = icon.iconSet === 'fontawesome' ? FontAwesome : Ionicon;

  return (
    <Pressable
      className={cn(
        props.disabled && 'opacity-50',
        buttonVariants({ size, className, radius }),
        'bg-card'
      )}
      ref={ref}
      role="button"
      onPress={() => {
        console.log('Button pressed for social method:', socialMethod);
        ssoLogin();
      }}
      {...props}
    >
      {({ pressed }) => (
        <View
          className={cn(pressed && 'opacity-50', 'flex flex-row items-center justify-center gap-2')}
        >
          <Icon
            name={icon.name as keyof typeof FontAwesome}
            size={iconSize}
            color={method.icon.color}
          />
          {!isCompact && <Text>{method.title}</Text>}
        </View>
      )}
    </Pressable>
  );
};

SSOButton.displayName = 'SSOButton';

export { SSOButton, buttonVariants };

const socialMethods = {
  google: {
    title: 'Sign in with Google',
    strategy: 'oauth_google',
    icon: {
      color: '#fff',
      round: { name: 'logo-google', iconSet: 'ionicons' },
      plain: { name: 'google', iconSet: 'fontawesome' },
    },
  },
  facebook: {
    title: 'Sign in with Facebook',
    strategy: 'oauth_facebook',
    icon: {
      color: '#1877f2',
      square: { name: 'facebook-square', iconSet: 'fontawesome' },
      round: { name: 'logo-facebook', iconSet: 'ionicons' },
      plain: { name: 'facebook-f', iconSet: 'fontawesome' },
    },
  },
  apple: {
    title: 'Sign in with Apple',
    strategy: 'oauth_apple',
    icon: {
      color: '#000000',
      round: { name: 'logo-apple', iconSet: 'ionicons' },
      plain: { name: 'apple', iconSet: 'fontawesome' },
    },
  },
  github: {
    title: 'Sign in with GitHub',
    strategy: 'oauth_github',
    icon: {
      color: '#333',
      square: { name: 'github-square', iconSet: 'fontawesome' },
      round: { name: 'logo-github', iconSet: 'ionicons' },
      plain: { name: 'github', iconSet: 'fontawesome' },
    },
  },
  twitter: {
    title: 'Sign in with Twitter',
    strategy: 'oauth_twitter',
    icon: {
      color: '#1DA1F2',
      square: { name: 'twitter-square', iconSet: 'fontawesome' },
      round: { name: 'logo-twitter', iconSet: 'ionicons' },
      plain: { name: 'twitter', iconSet: 'fontawesome' },
    },
  },
  microsoft: {
    title: 'Sign in with Microsoft',
    strategy: 'oauth_microsoft',
    icon: {
      color: '#00A4EF',
      round: { name: 'logo-microsoft', iconSet: 'ionicons' },
    },
  },
  linkedin: {
    title: 'Sign in with LinkedIn',
    strategy: 'oauth_linkedin',
    icon: {
      color: '#0077b5',
      square: { name: 'linkedin-square', iconSet: 'fontawesome' },
      round: { name: 'logo-linkedin', iconSet: 'ionicons' },
      plain: { name: 'linkedin', iconSet: 'fontawesome' },
    },
  },
  dropbox: {
    title: 'Sign in with Dropbox',
    strategy: 'oauth_dropbox',
    icon: {
      color: '#0061FF',
      plain: { name: 'dropbox', iconSet: 'fontawesome' },
    },
  },
  discord: {
    title: 'Sign in with Discord',
    strategy: 'oauth_discord',
    icon: {
      color: '#7289DA',
      square: { name: 'discord-square', iconSet: 'fontawesome' },
      round: { name: 'logo-discord', iconSet: 'ionicons' },
    },
  },
  twitch: {
    title: 'Sign in with Twitch',
    strategy: 'oauth_twitch',
    icon: {
      color: '#9146FF',
      plain: { name: 'twitch', iconSet: 'fontawesome' },
    },
  },
  tiktok: {
    title: 'Sign in with TikTok',
    strategy: 'oauth_tiktok',
    icon: {
      color: '#000000',
      plain: { name: 'tiktok', iconSet: 'fontawesome' },
    },
  },
  gitlab: {
    title: 'Sign in with GitLab',
    strategy: 'oauth_gitlab',
    icon: {
      color: '#FC6D26',
      plain: { name: 'gitlab', iconSet: 'fontawesome' },
    },
  },
  slack: {
    title: 'Sign in with Slack',
    strategy: 'oauth_slack',
    icon: {
      color: '#4A154B',
      square: { name: 'slack-square', iconSet: 'fontawesome' },
      round: { name: 'logo-slack', iconSet: 'ionicons' },
      plain: { name: 'slack', iconSet: 'fontawesome' },
    },
  },
  linear: {
    title: 'Sign in with Linear',
    strategy: 'oauth_linear',
    icon: {
      color: '#000000',
      plain: { name: 'linear', iconSet: 'fontawesome' },
    },
  },
  atlassian: {
    title: 'Sign in with Atlassian',
    strategy: 'oauth_atlassian',
    icon: {
      color: '#0052CC',
      plain: { name: 'atlassian', iconSet: 'fontawesome' },
    },
  },
  bitbucket: {
    title: 'Sign in with Bitbucket',
    strategy: 'oauth_bitbucket',
    icon: {
      color: '#2684FF',
      plain: { name: 'bitbucket', iconSet: 'fontawesome' },
    },
  },
  hubspot: {
    title: 'Sign in with HubSpot',
    strategy: 'oauth_hubspot',
    icon: {
      color: '#FF7A59',
      plain: { name: 'hubspot', iconSet: 'fontawesome' },
    },
  },
  coinbase: {
    title: 'Sign in with Coinbase',
    strategy: 'oauth_coinbase',
    icon: {
      color: '#0052FF',
      plain: { name: 'coinbase', iconSet: 'fontawesome' },
    },
  },
  spotify: {
    title: 'Sign in with Spotify',
    strategy: 'oauth_spotify',
    icon: {
      color: '#1DB954',
      plain: { name: 'spotify', iconSet: 'fontawesome' },
    },
  },
  notion: {
    title: 'Sign in with Notion',
    strategy: 'oauth_notion',
    icon: {
      color: '#000000',
      plain: { name: 'notion', iconSet: 'fontawesome' },
    },
  },
  line: {
    title: 'Sign in with LINE',
    strategy: 'oauth_line',
    icon: {
      color: '#00C300',
      plain: { name: 'line', iconSet: 'fontawesome' },
    },
  },
  box: {
    title: 'Sign in with Box',
    strategy: 'oauth_box',
    icon: {
      color: '#0061FF',
      plain: { name: 'box', iconSet: 'fontawesome' },
    },
  },
  xero: {
    title: 'Sign in with Xero',
    strategy: 'oauth_xero',
    icon: {
      color: '#13B5EA',
      plain: { name: 'xero', iconSet: 'fontawesome' },
    },
  },
};
