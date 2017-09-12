import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
const Realm = require('realm');
import RNFS from 'react-native-fs';
import Hotline from './schema/schema.js'
const LoiSchema = {
  name: 'LoiOto',
  properties: {
    key: 'int',
    ten_loi: 'string',
    noi_dung: 'string',
    muc_phat: 'string',
    phat_bo_sung: 'string',
    dieu_khoan: 'string',
    doi_tuong: 'string'
  }
};
console.log(Hotline)


// RNFS.copyFileAssets('hotline', RNFS.DocumentDirectoryPath + '/hotline')
//   .then(() => {
//     const realm = new Realm({
//       path: RNFS.DocumentDirectoryPath + '/hotline',
//       schema: [Hotline]
//     })

//     const cars = realm.objects('DuongDayNong').slice(5, 10)
//     console.log('====================')
//     console.log(cars)
//     console.log('=================================================')
//   })





export default class fs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      realm: null,
      mangHotline: [],
      begin:0,
      end:5

    };
  }



  componentDidMount() {
    RNFS.copyFileAssets('xeoto', RNFS.DocumentDirectoryPath + '/xeoto')
      .then(() => {
        const realm = new Realm({
          path: RNFS.DocumentDirectoryPath + '/xeoto',
          schema: [LoiSchema]
        })
        
        items = realm.objects('LoiOto').slice(this.state.begin, this.state.end)
        this.setState({
          mangHotline: [...this.state.mangHotline, ...items],
          begin:this.state.begin+5,
          end:this.state.end+5
        })
      })
  }
  EndReach = () => {

    RNFS.copyFileAssets('xeoto', RNFS.DocumentDirectoryPath + '/xeoto')
      .then(() => {
        const realm = new Realm({
          path: RNFS.DocumentDirectoryPath + '/xeoto',
          schema: [LoiSchema]
        })
        items = realm.objects('LoiOto').slice(this.state.begin, this.state.end)

        if (items.length > 0) {
          this.setState({
            mangHotline: [...this.state.mangHotline, ...items],
            begin:this.state.begin+5,
            end:this.state.end+5
          })
        }else{
          return 0
        }
      })

  }

  render() {

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.mangHotline}
          renderItem={({item}) => <Text style={styles.item}>{item.key}---{item.ten_loi}--{item.muc_phat}</Text>}
          onEndReachedThreshold={0.2}
          onEndReached={() => { this.EndReach() } }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#F5FCFF',
  },
  item: {
    backgroundColor: 'pink',
    padding: 35,
    margin: 3,

  },

});

AppRegistry.registerComponent('fs', () => fs);
