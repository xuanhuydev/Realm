import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, FlatList } from 'react-native';
const Realm = require('realm');
import RNFS from 'react-native-fs';
const ItemSchema = {
  name: 'Item',
  properties: {
    key: 'int',
    tenLoi: 'string',
    mucPhat: 'string'
  }
};

RNFS.copyFileAssets('huy.realm', RNFS.DocumentDirectoryPath + '/huy.realm')
  .then(() => {
    const realm = new Realm({
      path: RNFS.DocumentDirectoryPath + '/huynew.realm',
      schema: [ItemSchema]
    })
    realm.write(() => {
      realm.create('Item', { key: 22, tenLoi: 'day la ten loi', mucPhat: 'day la muc phat' })
    })

    const cars = realm.objects('Item')
    console.log('====================')
    console.log('lengh: ' + cars.length)
    console.log('====================')
  })



export default class fs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      realm: null,

    };
  }


  componentDidMount() {
    fetch("http://192.168.8.2/xuphat/main.php")
      .then((data) => data.json())
      .then((dataJson) => {

        dataJson.forEach((item) => {
          console.log('ahihi')
        })
      })
      .catch((e) => { console.log(e) })
  }


  render() {
    const info = this.state.realm
      ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Item').length
      : 'Loading...';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
          huy
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('fs', () => fs);
