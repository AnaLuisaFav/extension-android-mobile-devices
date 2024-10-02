import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function App() {
  const [tests, setTests] = useState([]);
  const [newTestName, setNewTestName] = useState("");

  useEffect(() => {
    const loadTests = async () => {
      try {
        const storedTests = await AsyncStorage.getItem('tests');
        if (storedTests) {
          setTests(JSON.parse(storedTests)); 
        }
      } catch (error) {
        console.error('Erro ao carregar os testes: ', error);
      }
    };

    loadTests();
  }, []);

  const saveTests = async (updatedTests) => {
    try {
      await AsyncStorage.setItem('tests', JSON.stringify(updatedTests));
    } catch (error) {
      console.error('Erro ao salvar os testes: ', error);
    }
  };

  const addTest = () => {
    if (newTestName.trim()) {
      const newTest = {
        id: tests.length + 1,
        name: newTestName,
        status: null,
      };
      const updatedTests = [...tests, newTest];
      setTests(updatedTests);
      setNewTestName("");
      saveTests(updatedTests); 
    }
  };

  const resetTests = async () => {
    setTests([]);
    await AsyncStorage.removeItem('tests');
  };

  const handleTestExecution = (id, result) => {
    const updatedTests = tests.map((test) =>
      test.id === id ? { ...test, status: result } : test
    );
    setTests(updatedTests);
    saveTests(updatedTests); 
  };

  const renderTestButtons = (test) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={[styles.button, test.status === "Passou" ? styles.pass : styles.buttonDefault]}
      onPress={() => handleTestExecution(test.id, "Passou")}
      disabled={test.status !== null && test.status !== "Passou"}
    >
      <Text style={styles.buttonText}>Passou</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, test.status === "Falhou" ? styles.fail : styles.buttonDefault]}
      onPress={() => handleTestExecution(test.id, "Falhou")}
      disabled={test.status !== null && test.status !== "Falhou"}
    >
      <Text style={styles.buttonText}>Falhou</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, test.status === "Bloqueado" ? styles.blocked : styles.buttonDefault]}
      onPress={() => handleTestExecution(test.id, "Bloqueado")}
      disabled={test.status !== null && test.status !== "Bloqueado"}
    >
      <Text style={styles.buttonText}>Bloqueado</Text>
    </TouchableOpacity>
  </View>
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Tracker</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTestName}
          onChangeText={setNewTestName}
          placeholder="Digite o nome do teste"
        />
        <Button title="Adicionar Teste" onPress={addTest} />
      </View>

      <FlatList
        data={tests}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.testItem}>
            <Text style={styles.testName}>{item.name}</Text>
            {renderTestButtons(item)}
          </View>
        )}
      />

      <Button title="Resetar Testes" onPress={resetTests} color="#f44336" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    width: 200,
  },
  testItem: {
    backgroundColor: '#f4f4f4',
    marginVertical: 10,
    padding: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  testName: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 80,
  },
  buttonDefault: {
    backgroundColor: '#ccc', 
  },
  pass: {
    backgroundColor: '#28a745',
  },
  fail: {
    backgroundColor: '#dc3545',
  },
  blocked: {
    backgroundColor: '#ffc107',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
