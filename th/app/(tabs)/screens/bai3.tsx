import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [color, setColor] = useState("#87CEEB"); // Màu ban đầu (xanh da trời)
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const newColor = `rgb(${r},${g},${b})`;

    // Hiệu ứng fade nhẹ khi đổi màu
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    setColor(newColor);
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.card}>
        <Text style={styles.title}>🎨 Bài 3 – Đổi màu nền</Text>
        <Text style={styles.subtitle}>
          Nhấn nút bên dưới để đổi màu ngẫu nhiên
        </Text>

        <Animated.View
          style={[
            styles.colorCircle,
            { backgroundColor: color, opacity: fadeAnim },
          ]}
        />

        <Text style={styles.colorCode}>{color.toUpperCase()}</Text>

        <TouchableOpacity style={styles.button} onPress={randomColor}>
          <Text style={styles.buttonText}>Đổi màu 🎨</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  colorCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#fff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  colorCode: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    shadowColor: "#007AFF",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
