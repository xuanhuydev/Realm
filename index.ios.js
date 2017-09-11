import React, { Component } from 'react';
import {  AppRegistry,  StyleSheet,  Text,  View} from 'react-native';
const Realm = require('realm');
import RNFS  from 'react-native-fs';
const CarSchema = {
  name: 'Car',
  properties: {
    model: 'string',
  }
};

RNFS.copyFileAssets('huy.realm',RNFS.DocumentDirectoryPath + '/huy.realm')
.then( ()=>{
  const realm = new Realm({
    path:RNFS.DocumentDirectoryPath + '/huy.realm',
    schema:[CarSchema]
  })

  const people = realm.objects('Car')
  console.log('====================')
  console.log('lengh: '+people.length)
  console.log('====================')
} )



export default class fs extends Component {

  constructor(props) {
    super(props);
    this.state = { realm: null };
  }


  componentWillMount() {
    Realm.open({
      schema: [CarSchema],
      path:'huy.realm'
    }).then(realm => {
      realm.write(() => {
        realm.create('Car', {model: 'Van Huy'});
      });
      this.setState({ realm });
    });
  }

  render() {
    const info = this.state.realm
      ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Car').length
      : 'Loading...';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
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
