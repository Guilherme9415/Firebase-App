import React, {useState, useEffect,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native';
import Login from './src/components/Login';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import List from './src/components/List';
import firebase from './src/services/firebase';
import Feather from 'react-native-vector-icons/Feather';

export default function App() {
  const [user, setUser] = useState(null);
  const [newT, setNewT] = useState('');

  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [key, setKey] = useState('');

  useEffect(()=>{
    function getUser(){
      if(!user){
        return;
      }
      firebase.database().ref('tarefas').child(user).once('value', (snapshot)=>{
        setTasks([]);

        snapshot?.forEach(( childItem ) =>{
          let data ={
            key: childItem.key,
            nome: childItem.val().nome
          }
          setTasks(oldTasks => [...oldTasks, data]);
        })

      })
    }
    getUser();

  },[user])

  function handleDelete(key) {
    firebase.database().ref('tarefas').child(user).child(key).remove()
    .then(() => {
      const fildTasks = tasks.filter(item => item.key !== key);
      setTasks(fildTasks)
    })
  }

  function handleEdit(data) {
    setKey(data.key)
    setNewT(data.nome)
    inputRef.current.focus();
  }

  function cancelEdit() {
    setKey('');
    setNewT('');
    Keyboard.dismiss();
  }

  function handleAdd() {
    if (newT === '') {
      return;
    }

    //Usuario quer editar uma tarefa 

    if(key !== ''){
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome:newT
      })
      .then(() =>{
        const tasksIndex = tasks.findIndex( item => item.key === key );
        let tasksClone = tasks;
        tasksClone[tasksIndex].nome = newT
        setTasks([...tasksClone])
      })
      Keyboard.dismiss();
      setNewT('');
      setKey('');
      return;
    }

    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas
      .child(chave)
      .set({
        nome: newT,
      })
      .then(() => {
        const data = {
          key: chave,
          nome: newT,
        };
        setTasks(oldTasks => [...oldTasks, data]);
      });
      Keyboard.dismiss();
      setNewT('');
  }

  if (!user) {
    return <Login changeStatus={user => setUser(user)} />;
  }

  return (
    <SafeAreaView style={styles.container}>

      {key.length > 0 &&(
        <View style={{ flexDirection:'row'}}>
        <TouchableOpacity onPress={cancelEdit}>
          <Feather name="x-circle" size={23} color="#ff0000"/>
        </TouchableOpacity>
        <Text style={{ marginLeft:5,color:'#ff0000', fontSize:15, fontWeight:'bold'}}>Você está editando uma tarefa!</Text>
      </View> 
      )}

        <View style={styles.containerTask}>
          <TextInput
            style={styles.input}
            placeholder="O que vai fazer hoje?"
            value={newT}
            onChangeText={text => setNewT(text)}
            ref={inputRef}
          />

          <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
            <Icon style={styles.icon} name="plus-box" size={60} color="#000" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <List data={item} deleteItem={handleDelete} edtiItem={handleEdit} />
          )}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    height: 45,
    fontSize: 20,
  },
  buttonAdd: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
  },
  icon: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
