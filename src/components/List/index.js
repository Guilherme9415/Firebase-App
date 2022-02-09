import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function List({ data, deleteItem, edtiItem}){
  return(
    <View style={styles.container}>

      <TouchableOpacity style={{ marginRight: 10}} onPress={() => deleteItem(data.key)}>
       <Icon name="delete" color="#fff" size={30} />
      </TouchableOpacity>

      <View style={{paddingRight:10}}>
        <TouchableWithoutFeedback onPress={()=> edtiItem(data)}>
          <Text style={{ fontSize:20, fontWeight:'bold', color: '#fff', paddingRight:10}}>{data.nome}</Text>
        </TouchableWithoutFeedback>
      </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor:'#e85d04',
    alignItems: 'center',
    marginBottom:10,
    padding:10,
    borderRadius:6
  }
})