import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
} from "react-native";

const API_KEY = "a051d55bf6c46ed012661e4cde9dae82";

export default function Bai5() {
  const [city, setCity] = useState("Hanoi");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    Keyboard.dismiss();

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=vi`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError("Không tìm thấy thành phố!");
        setWeather(null);
      }
    } catch (err) {
      setError("Lỗi kết nối mạng!");
      setWeather(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Bài 5 – Ứng dụng Dự báo Thời tiết</Text>

      {/* Ô nhập thành phố */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên thành phố..."
          value={city}
          onChangeText={setCity}
          onSubmitEditing={fetchWeather}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeather}>
          <Text style={styles.btnText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 30 }} />}

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        weather && (
          <View style={styles.card}>
            <Text style={styles.city}>{weather.name}</Text>
            <Text style={styles.country}>{weather.sys.country}</Text>

            <Image
              style={styles.icon}
              source={{
                uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
              }}
            />

            <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
            <Text style={styles.desc}>{weather.weather[0].description}</Text>

            <View style={styles.row}>
              <Text style={styles.detail}>💧 Độ ẩm: {weather.main.humidity}%</Text>
              <Text style={styles.detail}>🌬️ Gió: {weather.wind.speed} m/s</Text>
            </View>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 15,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    marginTop: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  city: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  country: {
    fontSize: 18,
    color: "#555",
  },
  icon: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#007AFF",
  },
  desc: {
    fontSize: 18,
    textTransform: "capitalize",
    color: "#444",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  detail: {
    fontSize: 16,
    color: "#555",
  },
  error: {
    color: "red",
    marginTop: 20,
    fontSize: 16,
  },
});
