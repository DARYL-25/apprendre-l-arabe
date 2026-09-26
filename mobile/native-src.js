// Pont natif : expose les plugins Capacitor à l'app web (window.NativePlugins).
// Ce fichier est compilé en www/native.js par build-www.js (esbuild).
import { Capacitor } from "@capacitor/core";
import { TextToSpeech } from "@capacitor-community/text-to-speech";
import { Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { Preferences } from "@capacitor/preferences";

window.NativePlugins = { TextToSpeech, Purchases, LOG_LEVEL, Preferences };

if (Capacitor.isNativePlatform()) {
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  if (Capacitor.getPlatform() === "android") StatusBar.setBackgroundColor({ color: "#0a2e22" }).catch(() => {});
  window.addEventListener("load", () => setTimeout(() => SplashScreen.hide().catch(() => {}), 300));
}
