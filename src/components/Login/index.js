import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from '../../services/firebase';

export default function Login({changeStatus}) {
  const [type, setType] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    if (type === 'login') {
      const user = firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        changeStatus(user.user.uid);
      })
      .catch(err => {
        console.error(err);
        alert('Ops parece que deu erro.');
        return;
      });
    } else {
      const user = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        changeStatus(user.user.uid);
      })
      .catch(err => {
        console.error(err);
        alert('Ops erro ao cadastrar.');
        return;
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Seu email"
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        placeholder="*********"
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity
        style={[
          styles.handleLogin,
          {backgroundColor: type === 'login' ? '#4361ee' : '#ef233c'},
        ]}
        onPress={handleSignIn}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {type === 'login' ? 'Login' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setType(type => (type === 'login' ? 'cadastrar' : 'login'))
        }>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
          }}>
          {type === 'login' ? ' Criar uma conta' : 'Já possui uma conta'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 45,
    padding: 10,
    borderWidth: 1,
    fontSize:18
  },
  handleLogin: {
    align: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 15,
    borderRadius: 6,
  },
});
