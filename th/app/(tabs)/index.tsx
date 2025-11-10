import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

// Import các component bài học
import Bai1 from "./screens/bai1";
import Bai2 from "./screens/bai2";
import Bai3 from "./screens/bai3";
import Bai4 from "./screens/bai4";
import Bai5 from "./screens/bai5";

export default function App() {
  const [current, setCurrent] = useState(1);
  const fadeAnim = new Animated.Value(1);

  const goNext = () => {
    if (current < 5) switchScreen(current + 1);
  };

  const goPrev = () => {
    if (current > 1) switchScreen(current - 1);
  };

  const switchScreen = (to: number) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setCurrent(to));
  };

  const renderScreen = () => {
    switch (current) {
      case 1:
        return <Bai1 />;
      case 2:
        return <Bai2 />;
      case 3:
        return <Bai3 />;
      case 4:
        return <Bai4 />;
      case 5:
        return <Bai5 />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Bộ Bài React Native</Text>

      {/* Khung bài học */}
      <Animated.View style={{ opacity: fadeAnim, width: "100%", flex: 1 }}>
        {renderScreen()}
      </Animated.View>

      {/* Thanh chuyển bài */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={[styles.navButton, current === 1 && styles.disabled]}
          onPress={goPrev}
          disabled={current === 1}
        >
          <Text style={styles.navText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>Bài {current}</Text>

        <TouchableOpacity
          style={[styles.navButton, current === 5 && styles.disabled]}
          onPress={goNext}
          disabled={current === 5}
        >
          <Text style={styles.navText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FA",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginVertical: 20,
  },
  navButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  navText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "#AAB7C4",
  },
  pageText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});
