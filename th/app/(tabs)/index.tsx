import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function Index() {
  /*** BÀI 1 – Danh thiếp cá nhân ***/
  const cardData = {
    avatar: "https://i.pravatar.cc/150",
    name: "test",
    job: "Frontend Developer",
    contact: "test@example.com",
  };

  /*** BÀI 2 – Tính điểm trung bình ***/
  const [toan, setToan] = useState("");
  const [ly, setLy] = useState("");
  const [hoa, setHoa] = useState("");
  const [diemTB, setDiemTB] = useState<number | null>(null);

  const tinhDiemTB = () => {
    const t = parseFloat(toan);
    const l = parseFloat(ly);
    const h = parseFloat(hoa);
    if (isNaN(t) || isNaN(l) || isNaN(h)) {
      alert("Vui lòng nhập đầy đủ điểm hợp lệ!");
      return;
    }
    setDiemTB(((t + l + h) / 3));
  };

  /*** BÀI 3 – Đổi màu nền ***/
  const [color, setColor] = useState("#f8f6f6ff");

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const newColor = `rgb(${r},${g},${b})`;
    setColor(newColor);
  };

  /*** BÀI 4 – Danh sách công việc ***/
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ id: string; name: string }[]>([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks(prev => [...prev, { id: Date.now().toString(), name: task }]);
    setTask("");
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleLongPress = (id: string) => {
    Alert.alert(
      "Xóa công việc",
      "Bạn có chắc muốn xóa công việc này?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", onPress: () => removeTask(id) }
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.scrollContainer, { backgroundColor: color }]} // đổi toàn bộ background
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 20 }}
    >
      
      
      {/* BÀI 1 – Danh thiếp */}
      <Text style={styles.sectionTitle}>Bài 1 – Danh thiếp cá nhân</Text>
      <View style={styles.card}>
        <Image source={{ uri: cardData.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{cardData.name}</Text>
        <Text style={styles.job}>{cardData.job}</Text>
        <Text style={styles.contact}>{cardData.contact}</Text>
      </View>

      {/* BÀI 2 – Tính điểm trung bình */}
      <Text style={styles.sectionTitle}>Bài 2 – Tính điểm trung bình</Text>
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
      <Button title="Tính điểm" onPress={tinhDiemTB} />
      {diemTB !== null && <Text style={styles.result}>Điểm trung bình: {diemTB.toFixed(2)}</Text>}

      {/* BÀI 3 – Đổi màu nền */}
      <Text style={styles.sectionTitle}>Bài 3 – Đổi màu nền</Text>
      <View style={[styles.colorBox, { backgroundColor: color }]} />
      <Button title="Đổi màu" onPress={randomColor} />

      {/* BÀI 4 – Danh sách công việc */}
      <Text style={styles.sectionTitle}>Bài 4 – Danh sách công việc</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập công việc mới"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Thêm" onPress={addTask} />
      <FlatList
        style={{ marginTop: 10 }}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => handleLongPress(item.id)}
            style={styles.taskItem}
          >
            <Text>{item.name}</Text>
            <Button title="X" onPress={() => removeTask(item.id)} />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 15 },
  card: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5, 
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold" },
  job: { fontSize: 16, color: "#555" },
  contact: { marginTop: 8, color: "#007AFF" },
  input: { width: "70%", borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10, backgroundColor: "#fff" },
  result: { marginTop: 10, fontSize: 18, fontWeight: "bold" },
  colorBox: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 4, 
    borderColor: "#fff", 
    alignSelf: "center", 
    marginVertical: 10 
  },
  taskItem: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
});
