import { Stack } from 'expo-router';
import React from 'react';

/**
 * Minimal router layout.
 *
 * Assumption: we keep using Expo Router (already configured in `package.json` and `app.json`).
 * When you add more screens, create them under `src/app/`.
 */
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
