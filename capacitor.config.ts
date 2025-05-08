
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.507c85e9af94488ebb72b39f58d8ff69',
  appName: 'pothole-vision-swift',
  webDir: 'dist',
  server: {
    url: 'https://507c85e9-af94-488e-bb72-b39f58d8ff69.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
