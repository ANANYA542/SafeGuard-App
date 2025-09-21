import { Platform } from "react-native";
import Constants from "expo-constants";

function hostFromExpo() {
  const h =
    Constants?.expoGo?.debuggerHost ||
    Constants?.debuggerHost ||
    Constants?.manifest?.debuggerHost ||
    "";
  if (!h) return null;
  const ip = h.split(":")[0];
  if (!ip) return null;
  if (Platform.OS === "android" && ip === "localhost") return "10.0.2.2";
  return ip;
}

const expoHost = hostFromExpo();
export const API_BASE = expoHost
  ? `http://${expoHost}:4000`
  : Platform.OS === "android"
  ? "http://10.0.2.2:4000"
  : "http://20.20.22.219:4000"; // Hardcoded computer IP for phone testing
