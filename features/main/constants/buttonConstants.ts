import FontAwesome from '@expo/vector-icons/FontAwesome';

export const HELP_VIDEO_URLS = {
  SIGN_IN: 'https://www.youtube.com/watch?v=dTrBa2hqWoU',
  SIGN_OUT: 'https://www.youtube.com/watch?v=cqVaD4RFEVk',
} as const;

export const ICON_CONFIGS = {
  SIGN_IN: {
    name: 'user',
    size: 28,
    color: '#3B82F6', // blue-500
  },
  SIGN_OUT: {
    name: 'sign-out',
    size: 28,
    color: '#22C55E', // green-500
  },
} as const;

export const BUTTON_CONFIGS = {
  SIGN_IN: {
    title: 'SIGN IN',
    subtitle: 'Register and Sign In',
    iconComponent: FontAwesome,
    iconProps: ICON_CONFIGS.SIGN_IN,
    iconBgColor: 'bg-blue-100',
    buttonBgColor: 'bg-white/90',
    buttonBgHelpColor: 'bg-blue-500',
    labelBgHelpColor: 'bg-blue-500',
    labelTextBgHelpColor: 'text-blue-500',
    helpVideoUrl: HELP_VIDEO_URLS.SIGN_IN,
  },
  SIGN_OUT: {
    title: 'SIGN OUT',
    subtitle: 'Sign Out Properly',
    iconComponent: FontAwesome,
    iconProps: ICON_CONFIGS.SIGN_OUT,
    iconBgColor: 'bg-green-100',
    buttonBgColor: 'bg-white/90',
    buttonBgHelpColor: 'bg-green-500',
    labelBgHelpColor: 'bg-green-500',
    labelTextBgHelpColor: 'text-green-500',
    helpVideoUrl: HELP_VIDEO_URLS.SIGN_OUT,
  },
} as const;
