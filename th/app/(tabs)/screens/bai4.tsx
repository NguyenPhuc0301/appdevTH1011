import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ id: string; name: string }[]>([]);

  const addTask = () => {
    if (task.trim() === "") {
      Alert.alert("⚠️ Nhắc nhở", "Vui lòng nhập tên công việc!");
      return;
    }
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), name: task.trim() },
    ]);
    setTask("");
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLongPress = (id: string, name: string) => {
    Alert.alert("🗑 Xóa công việc", `Bạn có muốn xóa "${name}" không?`, [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", onPress: () => removeTask(id), style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>🧾 Bài 4 – Danh sách công việc</Text>
        <Text style={styles.subtitle}>Thêm, xem và xóa công việc của bạn</Text>

        {/* Ô nhập công việc */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="📝 Nhập công việc mới..."
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Thêm</Text>
          </TouchableOpacity>
        </View>

        {/* Danh sách công việc */}
        {tasks.length === 0 ? (
          <Text style={styles.emptyText}>✨ Chưa có công việc nào</Text>
        ) : (
          <FlatList
            style={{ width: "100%", marginTop: 10 }}
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => handleLongPress(item.id, item.name)}
                style={styles.taskItem}
              >
                <Text style={styles.taskText}>• {item.name}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeTask(item.id)}
                >
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
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
    shadowOffset: { width: 0, height: 5 },
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
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    backgroundColor: "#FAFAFA",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    marginLeft: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FDFDFD",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF3B30",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  deleteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyText: {
    color: "#999",
    marginTop: 20,
    fontStyle: "italic",
  },
});
