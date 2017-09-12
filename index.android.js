import React, { Component } from 'react';
import {  AppRegistry,  StyleSheet,  Text,  View} from 'react-native';
const Realm = require('realm');
import RNFS  from 'react-native-fs';

// const XeMaySchema = {
//   name: 'ffsdfsfsd',
//   properties: {
//     key:'int',
//     ten_loi: 'string',
//     noi_dung: 'string',
//     muc_phat: 'string',
//     phat_bo_sung: 'string',
//     dieu_khoan: 'string',
//     doi_tuong: 'string'
//   }
// };

const Hotline = {
  name: 'DuongDayNong',
  properties: {
    key:'int',
    ten_tinh: 'string',
    sdt_tinh: 'string'
  }
};


// RNFS.copyFileAssets('huy.realm', RNFS.DocumentDirectoryPath + '/huy.realm')
//   .then(() => {
//     const realm = new Realm({
//       path: RNFS.DocumentDirectoryPath + '/huynew.realm',
//       schema: [CarSchema]
//     })
//     realm.write(() => {
//       realm.create('Item', { key: 22, tenLoi: 'day la ten loi', mucPhat: 'day la muc phat' })
//     })

//     const cars = realm.objects('Item')
//     console.log('====================')
//     console.log('lengh: ' + cars.length)
//     console.log('====================')
//   })





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
      .then((dataJson) => { dataJson.forEach((item) => { 
        const realm = new Realm({ schema:[Hotline],path:'hotline' })
        realm.write( ()=>{
          realm.create('DuongDayNong', item)
        } )
        this.setState({
          realm:realm
        })
       })
      })
      .catch((e) => { console.log(e) })
  }


  render() {
    const info = this.state.realm ? 'num: '+ this.state.realm.objects('DuongDayNong').length :'loading'


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
