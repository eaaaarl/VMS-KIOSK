import type FontAwesome from '@expo/vector-icons/FontAwesome';
import type { ComponentProps } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HelpButton } from './HelpButton';

export interface ActionButtonProps {
  title: string;
  subtitle: string;
  iconComponent: typeof FontAwesome;
  iconProps: {
    name: ComponentProps<typeof FontAwesome>['name'];
    size: number;
    color: string;
  };
  iconBgColor: string;
  buttonBgColor: string;
  onPress: () => void;
  isLandscape: boolean;
  helpVideoUrl?: string;
  buttonBgHelpColor?: string;
  labelBgHelpColor?: string;
  labelTextBgHelpColor?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  subtitle,
  iconComponent: IconComponent,
  iconProps,
  iconBgColor,
  buttonBgColor,
  onPress,
  isLandscape,
  helpVideoUrl,
  buttonBgHelpColor,
  labelBgHelpColor,
  labelTextBgHelpColor,
}) => {
  return (
    <View className="relative min-w-[280px] min-h-[150px]">
      <TouchableOpacity
        className={`flex-1 border border-gray-300 py-5 ${buttonBgColor} min-w-[280px] max-w-[320px] items-center rounded-2xl transition-transform active:scale-95 active:bg-white/80 overflow-hidden`}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View
          className={`${isLandscape ? 'h-16 w-16' : 'h-20 w-20'} ${iconBgColor} items-center justify-center rounded-xl ${isLandscape ? 'mb-3' : 'mb-6'}`}
        >
          <View
            className={`h-12 w-12 items-center justify-center rounded-lg`}
          >
            <IconComponent {...iconProps} />
          </View>
        </View>

        <Text
          className={`text-gray-800 ${isLandscape ? 'text-2xl' : 'text-2xl'} mb-2 font-bold tracking-wide px-4`}
          numberOfLines={1}
        >
          {title}
        </Text>

        <Text
          className="text-center text-base text-gray-600 px-4"
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      </TouchableOpacity>

      {helpVideoUrl && (
        <HelpButton
          videoUrl={helpVideoUrl}
          position="top-right"
          showLabel={true}
          color={buttonBgHelpColor}
          labelBgHelpColor={labelBgHelpColor}
          labelTextBgColor={labelTextBgHelpColor}
        />
      )}
    </View>
  );
};