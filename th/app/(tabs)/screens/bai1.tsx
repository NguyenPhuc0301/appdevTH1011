import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Bai1() {
  const cardData = {
    avatar: "https://i.pravatar.cc/150",
    name: "test",
    job: "Frontend Developer",
    contact: "test@example.com",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 1 – Danh thiếp cá nhân</Text>

      <TouchableOpacity activeOpacity={0.9}>
        <View style={styles.card}>
          <Image source={{ uri: cardData.avatar }} style={styles.avatar} />

          <Text style={styles.name}>{cardData.name}</Text>
          <Text style={styles.job}>{cardData.job}</Text>

          <View style={styles.line} />

          <Text style={styles.contact}>{cardData.contact}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F0F4F8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#333",
  },
  card: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  job: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
    marginBottom: 8,
  },
  line: {
    width: "60%",
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 10,
  },
  contact: {
    fontSize: 15,
    color: "#007AFF",
    fontWeight: "500",
  },
});
