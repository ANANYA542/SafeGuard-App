import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AnimatedGradient from "../components/AnimatedGradient";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineChart from "../components/SimpleLineChart";
import { Accelerometer, Gyroscope } from "expo-sensors";
import * as Location from "expo-location";
import { Audio } from "expo-av";
import { getCooldownRemaining, triggerSOS } from "../utils/sos";

export default function SafetyMonitor({ navigation }) {
  const [accEnabled, setAccEnabled] = useState(true);
  const [gyroEnabled, setGyroEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [accData, setAccData] = useState([]);
  const [gyroData, setGyroData] = useState([]);
  const [soundLevel, setSoundLevel] = useState([]);
  const accSub = useRef(null);
  const gyroSub = useRef(null);
  const micTimer = useRef(null);
  const impactAt = useRef(0);
  const stillStart = useRef(0);
  const lastMicTime = useRef(0);
  const lastMicAmp = useRef(0);

  useEffect(() => {
    if (accEnabled && !accSub.current) {
      Accelerometer.setUpdateInterval(200);
      accSub.current = Accelerometer.addListener(({ x, y, z }) => {
        const t = Date.now();
        const g = Math.sqrt(x * x + y * y + z * z);
        setAccData((prev) => [...prev.slice(-49), { x, y, z, t }]);
        if (g > 18) {
          impactAt.current = t;
          stillStart.current = 0;
        } else if (impactAt.current && t - impactAt.current <= 4000) {
          if (g < 1.5) {
            if (!stillStart.current) stillStart.current = t;
            if (t - stillStart.current >= 3000) {
              impactAt.current = 0;
              stillStart.current = 0;
              if (getCooldownRemaining() <= 0) triggerSOS("accident");
            }
          } else {
            stillStart.current = 0;
          }
        }
      });
    }
    if (!accEnabled && accSub.current) {
      accSub.current.remove();
      accSub.current = null;
    }
  }, [accEnabled]);

  useEffect(() => {
    if (gyroEnabled && !gyroSub.current) {
      Gyroscope.setUpdateInterval(200);
      gyroSub.current = Gyroscope.addListener(({ x, y, z }) => {
        const t = Date.now();
        const m = Math.sqrt(x * x + y * y + z * z);
        setGyroData((prev) => [...prev.slice(-49), { x, y, z, t }]);
        if (
          m > 6.0 &&
          lastMicAmp.current > 0.65 &&
          t - lastMicTime.current <= 800
        ) {
          if (getCooldownRemaining() <= 0) triggerSOS("attack");
        }
      });
    }
    if (!gyroEnabled && gyroSub.current) {
      gyroSub.current.remove();
      gyroSub.current = null;
    }
  }, [gyroEnabled]);

  useEffect(() => {
    if (micEnabled && !micTimer.current) {
      (async () => {
        try {
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
          const rec = new Audio.Recording();
          await rec.prepareToRecordAsync(
            Audio.RecordingOptionsPresets.HighQuality
          );
          await rec.startAsync();
          micTimer.current = setInterval(async () => {
            try {
              const s = await rec.getStatusAsync();
              const v = s.metering
                ? Math.min(1, Math.max(0, (s.metering + 160) / 80))
                : 0;
              setSoundLevel((prev) => [
                ...prev.slice(-49),
                { v, t: Date.now() },
              ]);
              if (v > 0.65) {
                lastMicAmp.current = v;
                lastMicTime.current = Date.now();
              }
            } catch {}
          }, 400);
          rec._meteringInterval = micTimer.current;
        } catch {}
      })();
    }
    if (!micEnabled && micTimer.current) {
      clearInterval(micTimer.current);
      micTimer.current = null;
    }
  }, [micEnabled]);

  useEffect(() => {
    return () => {
      if (accSub.current) accSub.current.remove();
      if (gyroSub.current) gyroSub.current.remove();
      if (micTimer.current) clearInterval(micTimer.current);
    };
  }, []);

  async function startMic() {}

  async function stopMic() {}

  const active = accEnabled || gyroEnabled || micEnabled;
  return (
    <AnimatedGradient>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 24 }} 
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SafeGuard</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.statusCard}>
          <View style={styles.statusCircle}>
            <Ionicons name="shield-checkmark" size={32} color="#0B1220" />
          </View>
          <Text style={styles.statusTitle}>
            {active ? "MONITORING ACTIVE" : "MONITORING OFF"}
          </Text>
          <Text style={styles.statusSub}>
            {active
              ? `Monitoring • Cooldown ${Math.ceil(
                  getCooldownRemaining() / 1000
                )}s`
              : "Enable sensors to start monitoring."}
          </Text>
        </View>
        <View style={styles.toggleCard}>
          <View style={styles.toggleLeft}>
            <View style={styles.toggleIcon}>
              <Ionicons name="swap-vertical" size={18} color="#fff" />
            </View>
            <View>
              <Text style={styles.toggleTitle}>Accelerometer</Text>
              <Text style={styles.toggleSub}>Detects falls and impacts</Text>
            </View>
          </View>
          <Switch
            value={accEnabled}
            onValueChange={setAccEnabled}
            trackColor={{ false: "#3B3F48", true: "#2F80ED" }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.toggleCard}>
          <View style={styles.toggleLeft}>
            <View style={styles.toggleIcon}>
              <Ionicons name="sync-outline" size={18} color="#fff" />
            </View>
            <View>
              <Text style={styles.toggleTitle}>Gyroscope</Text>
              <Text style={styles.toggleSub}>Monitors orientation changes</Text>
            </View>
          </View>
          <Switch
            value={gyroEnabled}
            onValueChange={setGyroEnabled}
            trackColor={{ false: "#3B3F48", true: "#2F80ED" }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.toggleCard}>
          <View style={styles.toggleLeft}>
            <View style={styles.toggleIcon}>
              <Ionicons name="mic-outline" size={18} color="#fff" />
            </View>
            <View>
              <Text style={styles.toggleTitle}>Microphone</Text>
              <Text style={styles.toggleSub}>
                Listens for signs of distress
              </Text>
            </View>
          </View>
          <Switch
            value={micEnabled}
            onValueChange={setMicEnabled}
            trackColor={{ false: "#3B3F48", true: "#2F80ED" }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.chartWrap}>
          <Text style={styles.chartTitle}>Movement Activity</Text>
          <View style={styles.chartCard}>
            <SimpleLineChart
              data={accData.map((d, i) => ({
                y: Math.sqrt(d.x * d.x + d.y * d.y + d.z * d.z),
              }))}
              width={320}
              height={120}
              color="#56CCF2"
            />
          </View>
        </View>
        <View style={styles.chartWrap}>
          <Text style={styles.chartTitle}>Sound Levels</Text>
          <View style={styles.chartCard}>
            <SimpleLineChart
              data={soundLevel.map((d, i) => ({ y: d.v }))}
              width={320}
              height={120}
              color="#2F80ED"
            />
          </View>
        </View>
        <Text style={styles.sectionTitle}>Recent Events</Text>
        <View style={styles.eventCard}>
          <View style={styles.eventIconWarn}>
            <Ionicons name="alert-outline" size={20} color="#F2C94C" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.eventTitle}>Potential Fall</Text>
            <Text style={styles.eventSub}>
              Oct 26, 2023 at 3:45 PM • New York, USA
            </Text>
            <TouchableOpacity>
              <Text style={styles.link}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.eventCard}>
          <View style={styles.eventIconDanger}>
            <Ionicons name="close-circle-outline" size={20} color="#EB5757" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.eventTitle}>Loud Sound Detected</Text>
            <Text style={styles.eventSub}>
              Oct 25, 2023 at 2:25 PM • London, UK
            </Text>
            <TouchableOpacity>
              <Text style={styles.link}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AnimatedGradient>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    marginTop: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  statusCard: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 24,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },
  statusCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#56CCF2",
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statusTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  statusSub: { color: "#98A2B3", fontSize: 13, marginTop: 6 },
  toggleCard: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLeft: { flexDirection: "row", alignItems: "center" },
  toggleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  toggleTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  toggleSub: { color: "#98A2B3", fontSize: 12 },
  chartWrap: { marginTop: 12 },
  chartTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: 16,
    marginBottom: 6,
  },
  chartCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 8,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 16,
  },
  eventCard: {
    marginHorizontal: 16,
    marginTop: 10,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
  },
  eventIconWarn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(242,201,76,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  eventIconDanger: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(235,87,87,0.16)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  eventTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  eventSub: { color: "#98A2B3", fontSize: 12, marginTop: 4 },
  link: { color: "#56CCF2", fontSize: 12, marginTop: 8, fontWeight: "700" },
});
