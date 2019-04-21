import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import MeteorWrapper from './meteor'
import {COLLECTIONS_LIST} from './meteor/service'

function App(props) {
  const {meteorList = [], initOver} = props
  return (
    <View style={styles.container}>
      <FlatList
        data={meteorList}
        renderItem={({item}) => (
          <View style={styles.item}>
            <View style={styles.name}><Text>{item.name}</Text></View>
            <View style={styles.desc}><Text>{item.desc}</Text></View>
          </View>)}
      />
    </View>
  );

}

export default MeteorWrapper(App, COLLECTIONS_LIST.info)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 14,
    lineHeight: 2,
  },
  item: {
    padding: 10,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  name: {
    color: '#000',
    fontWeight: "900",
    fontSize: 24
  },
  desc: {
    color: '#666'
  }
});
