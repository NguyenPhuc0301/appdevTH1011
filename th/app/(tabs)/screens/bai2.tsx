import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Animated } from "react-native";

export default function App() {
  const [toan, setToan] = useState("");
  const [ly, setLy] = useState("");
  const [hoa, setHoa] = useState("");
  const [diemTB, setDiemTB] = useState<number | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0]; // hiệu ứng fade-in kết quả

  const tinhDiemTB = () => {
    const t = parseFloat(toan);
    const l = parseFloat(ly);
    const h = parseFloat(hoa);
    if (isNaN(t) || isNaN(l) || isNaN(h)) {
      alert("Vui lòng nhập đầy đủ điểm hợp lệ!");
      return;
    }
    const kq = (t + l + h) / 3;
    setDiemTB(kq);

    // chạy animation khi hiện kết quả
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>🎯 Bài 2 – Tính điểm trung bình</Text>
        <Text style={styles.subtitle}>Nhập điểm 3 môn để tính điểm trung bình</Text>

        <TextInput
          style={styles.input}
          placeholder="Điểm Toán"
          keyboardType="numeric"
          value={toan}
          onChangeText={setToan}
        />
        <TextInput
          style={styles.input}
          placeholder="Điểm Lý"
          keyboardType="numeric"
          value={ly}
          onChangeText={setLy}
        />
        <TextInput
          style={styles.input}
          placeholder="Điểm Hóa"
          keyboardType="numeric"
          value={hoa}
          onChangeText={setHoa}
        />

        <View style={styles.buttonContainer}>
          <Button title="Tính điểm" color="#007AFF" onPress={tinhDiemTB} />
        </View>

        {diemTB !== null && (
          <Animated.View style={[styles.resultContainer, { opacity: fadeAnim }]}>
            <Text style={styles.resultText}>Điểm trung bình:</Text>
            <Text
              style={[
                styles.score,
                {
                  color:
                    diemTB >= 8
                      ? "#2ECC71"
                      : diemTB >= 6.5
                      ? "#F1C40F"
                      : "#E74C3C",
                },
              ]}
            >
              {diemTB.toFixed(2)}
            </Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "85%",
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 15,
    backgroundColor: "#FAFAFA",
    fontSize: 16,
  },
  buttonContainer: {
    width: "60%",
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden", // bo góc cho button
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#F9FAFB",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  resultText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  score: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
