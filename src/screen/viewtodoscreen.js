import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, Button, StyleSheet, RefreshControl } from "react-native";
import { collection, getDocs, updateDoc, doc } from "@react-native-firebase/firestore";
import TodoItem from "../component/TodoItem";
import { db } from "../config/firebaseConfigs";

const ViewTodosScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTodos = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todosData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setTodos(todosData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  const handleUpdateStatus = useCallback(async (id, currentStatus) => {
    const newStatus = currentStatus === "Doing" ? "Done" : "Doing";
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, { status: newStatus });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTodos();
    setRefreshing(false);
  }, [fetchTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onUpdateStatus={handleUpdateStatus} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ViewTodosScreen;