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

export default function SafetyMonitor({ navigation }) {
  const [accEnabled, setAccEnabled] = useState(true);
  const [gyroEnabled, setGyroEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [accData, setAccData] = useState([]);
  const [gyroData, setGyroData] = useState([]);
  const [soundLevel, setSoundLevel] = useState([]);
  const accTimer = useRef(null);
  const gyroTimer = useRef(null);
  const micTimer = useRef(null);

  useEffect(() => {
    if (accEnabled && !accTimer.current) {
      accTimer.current = setInterval(() => {
        const x = (Math.random() - 0.5) * 2;
        const y = (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 2;
        setAccData((prev) => [...prev.slice(-49), { x, y, z, t: Date.now() }]);
      }, 400);
    }
    if (!accEnabled && accTimer.current) {
      clearInterval(accTimer.current);
      accTimer.current = null;
    }
    return () => {};
  }, [accEnabled]);

  useEffect(() => {
    if (gyroEnabled && !gyroTimer.current) {
      gyroTimer.current = setInterval(() => {
        const x = (Math.random() - 0.5) * 4;
        const y = (Math.random() - 0.5) * 4;
        const z = (Math.random() - 0.5) * 4;
        setGyroData((prev) => [...prev.slice(-49), { x, y, z, t: Date.now() }]);
      }, 400);
    }
    if (!gyroEnabled && gyroTimer.current) {
      clearInterval(gyroTimer.current);
      gyroTimer.current = null;
    }
    return () => {};
  }, [gyroEnabled]);

  useEffect(() => {
    if (micEnabled && !micTimer.current) {
      micTimer.current = setInterval(() => {
        const v = Math.max(0, Math.min(1, Math.random() * 0.8 + 0.2));
        setSoundLevel((prev) => [...prev.slice(-49), { v, t: Date.now() }]);
      }, 500);
    }
    if (!micEnabled && micTimer.current) {
      clearInterval(micTimer.current);
      micTimer.current = null;
    }
    return () => {};
  }, [micEnabled]);

  useEffect(() => {
    return () => {
      if (accTimer.current) clearInterval(accTimer.current);
      if (gyroTimer.current) clearInterval(gyroTimer.current);
      if (micTimer.current) clearInterval(micTimer.current);
    };
  }, []);

  async function startMic() {
    const perm = await Audio.requestPermissionsAsync();
    if (!perm.granted) return;
    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HighQuality);
    await rec.startAsync();
    setRecording(rec);
    const interval = setInterval(async () => {
      try {
        const status = await rec.getStatusAsync();
        const level = status.metering || Math.random() * 0.5;
        setSoundLevel((prev) => [
          ...prev.slice(-49),
          { v: level, t: Date.now() },
        ]);
      } catch {}
    }, 500);
    rec._meteringInterval = interval;
  }

  async function stopMic() {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
      } catch {}
      if (recording._meteringInterval)
        clearInterval(recording._meteringInterval);
      setRecording(null);
    }
  }

  const active = accEnabled || gyroEnabled || micEnabled;
  return (
    <AnimatedGradient>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
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
              ? "Your safety is being monitored."
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