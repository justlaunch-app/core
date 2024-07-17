import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable, ViewStyle, StyleProp, View } from 'react-native';
import { cn } from '@/lib/cn';
import { Icon as FontAwesome, Ionicon } from '@/components/core/icon';
import { Text } from '@/components/core/text';

const buttonVariants = cva('group flex items-center justify-center', {
  variants: {
    size: {
      default: 'h-12 px-5 py-3',
      compact: 'h-16 w-16',
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
  };

const SSOButton = <T extends SocialMethod>(
  { className, size, socialMethod, radius, iconSize = 26, iconFormat, ...props }: ButtonProps<T>,
  ref: React.Ref<React.ElementRef<typeof Pressable>>
) => {
  const method = socialMethods[socialMethod];

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
      {...props}
    >
      {({ pressed }) => (
        <View className={cn(pressed && 'opacity-50')}>
          <Text className="flex items-center justify-center">
            <Icon
              name={icon.name as keyof typeof FontAwesome}
              size={iconSize}
              className="mr-2"
              color={method.icon.color}
            />
            {!isCompact && <Text>{method.title}</Text>}
          </Text>
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
    icon: {
      color: '#fff',
      round: { name: 'logo-google', iconSet: 'ionicons' },
      plain: { name: 'google', iconSet: 'fontawesome' },
    },
  },
  facebook: {
    title: 'Sign in with Facebook',
    icon: {
      color: '#1877f2',
      square: { name: 'facebook-square', iconSet: 'fontawesome' },
      round: { name: 'logo-facebook', iconSet: 'ionicons' },
      plain: { name: 'facebook-f', iconSet: 'fontawesome' },
    },
  },
  apple: {
    title: 'Sign in with Apple',
    icon: {
      color: '#000000',
      round: { name: 'logo-apple', iconSet: 'ionicons' },
      plain: { name: 'apple', iconSet: 'fontawesome' },
    },
  },
  microsoft: {
    title: 'Sign in with Microsoft',
    icon: {
      color: '#00A4EF',
      round: { name: 'logo-microsoft', iconSet: 'ionicons' },
    },
  },
  github: {
    title: 'Sign in with GitHub',
    icon: {
      color: '#333',
      square: { name: 'github-square', iconSet: 'fontawesome' },
      round: { name: 'logo-github', iconSet: 'ionicons' },
      plain: { name: 'github', iconSet: 'fontawesome' },
    },
  },
  twitter: {
    title: 'Sign in with Twitter',
    icon: {
      color: '#1DA1F2',
      square: { name: 'twitter-square', iconSet: 'fontawesome' },
      round: { name: 'logo-twitter', iconSet: 'ionicons' },
      plain: { name: 'twitter', iconSet: 'fontawesome' },
    },
  },
  linkedin: {
    title: 'Sign in with LinkedIn',
    icon: {
      color: '#0077b5',
      square: { name: 'linkedin-square', iconSet: 'fontawesome' },
      round: { name: 'logo-linkedin', iconSet: 'ionicons' },
      plain: { name: 'linkedin', iconSet: 'fontawesome' },
    },
  },
  instagram: {
    title: 'Sign in with Instagram',
    icon: {
      color: '#E1306C',
      square: { name: 'instagram-square', iconSet: 'fontawesome' },
      round: { name: 'logo-instagram', iconSet: 'ionicons' },
      plain: { name: 'instagram', iconSet: 'fontawesome' },
    },
  },
  whatsapp: {
    title: 'Sign in with WhatsApp',
    icon: {
      color: '#25D366',
      square: { name: 'whatsapp-square', iconSet: 'fontawesome' },
      round: { name: 'logo-whatsapp', iconSet: 'ionicons' },
      plain: { name: 'whatsapp', iconSet: 'fontawesome' },
    },
  },
  slack: {
    title: 'Sign in with Slack',
    icon: {
      color: '#4A154B',
      square: { name: 'slack-square', iconSet: 'fontawesome' },
      round: { name: 'logo-slack', iconSet: 'ionicons' },
      plain: { name: 'slack', iconSet: 'fontawesome' },
    },
  },
  amazon: {
    title: 'Sign in with Amazon',
    icon: {
      color: '#FF9900',
      square: { name: 'amazon-square', iconSet: 'fontawesome' },
      round: { name: 'logo-amazon', iconSet: 'ionicons' },
      plain: { name: 'amazon', iconSet: 'fontawesome' },
    },
  },
  spotify: {
    title: 'Sign in with Spotify',
    icon: {
      color: '#1DB954',
      plain: { name: 'spotify', iconSet: 'fontawesome' },
    },
  },
  steam: {
    title: 'Sign in with Steam',
    icon: {
      color: '#000000',
      square: { name: 'steam-square', iconSet: 'fontawesome' },
      round: { name: 'logo-steam', iconSet: 'ionicons' },
      plain: { name: 'steam', iconSet: 'fontawesome' },
    },
  },
  dribbble: {
    title: 'Sign in with Dribbble',
    icon: {
      color: '#EA4C89',
      square: { name: 'dribbble-square', iconSet: 'fontawesome' },
      round: { name: 'logo-dribbble', iconSet: 'ionicons' },
      plain: { name: 'dribbble', iconSet: 'fontawesome' },
    },
  },
  discord: {
    title: 'Sign in with Discord',
    icon: {
      color: '#7289DA',
      square: { name: 'discord-square', iconSet: 'fontawesome' },
      round: { name: 'logo-discord', iconSet: 'ionicons' },
    },
  },
  pinterest: {
    title: 'Sign in with Pinterest',
    icon: {
      color: '#E60023',
      square: { name: 'pinterest-square', iconSet: 'fontawesome' },
      round: { name: 'logo-pinterest', iconSet: 'ionicons' },
      plain: { name: 'pinterest', iconSet: 'fontawesome' },
    },
  },
} as const;
