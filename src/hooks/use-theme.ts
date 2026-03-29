/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  // `react-native` returns 'light' | 'dark' | null.
  // Default to 'light' when the OS preference is unavailable.
  const theme = scheme === 'dark' ? 'dark' : 'light';

  return Colors[theme];
}
