import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  TextInput,
  StatusBar,
} from 'react-native';
import Contacts from "expo-contacts";

const STORAGE_KEY = 'todos';

export default function App() {
  const [newTodo, setNewTodo] = useState('');
  const [Todos, setTodos] = useState([]);

  useEffect(() => {
    getData(); 
  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const addTodo = () => {
    const newKey = String(Todos.length);
    const object = { key: newKey, description: newTodo };
    const newTodos = [...Todos, object];
    storeData(newTodos);
    setTodos(newTodos);
    setNewTodo('');
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue !== null) {
        setTodos(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add Todo"
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
        returnKeyType="done"
        onSubmitEditing={addTodo}
      />
      <FlatList
        style={styles.list}
        data={Todos}
        extraData={Todos}
        renderItem={({ item }) => <Text>{item.description}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderColor: '#FAFAFA',
    height: 40,
    margin: 8,
  },
  list: {
    margin: 8,
  },
});
