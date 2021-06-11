import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput, Alert} from 'react-native';
import * as firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import db from '../config';

export default class ExchangeScreen extends React.Component {
constructor(){
    super();
    this.state={
        itemName:'',
        description:'',
        userName:'',
        exchangeID:'',
        IsExchangeRequestActive:'',
        requestedItemName:'',
        docId:'',
        itemStatus:'',
    }
}

getExchangeRequest=()=>{
    var exchangeRequest = db.collection("exchange_requests")
    .where('username','==',this.state.userName)
    .get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
          if(doc.data().item_status!=='received'){
            this.setState({
              exchangeID:doc.data().exchangeId,
              requestedItemName:doc.data().item_name,
              itemStatus:doc.data().item_status,    
              docId:doc.id
            })
          }
        })
      })
}

getIsExchangeRequestActive(){
    db.collection("users").where('username','==',this.state.userName).onSnapshot(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        this.setState({
        IsExchangeRequestActive:doc.data().IsExchangeRequestActive,
        userDocId:doc.id
        })
      })
    })
  }

createUniqueId(){
   return Math.random().toString(36).substring(7)
}

addItem=(itemName,description,)=>{
    var userName = this.state.userName;
    var exchangeId = this.createUniqueId();
    db.collection("exchange_requests").add({
        "username": userName,
        "item_name":itemName,
        "description":description,
        "request_id":exchangeId
    })
    this.setState({
        itemName:'',
        description:'',
        exchangeID:exchangeId
    })

    return Alert.alert(
        'Item ready to exchange',
        '',
        [
            {text: 'OK', onPress:()=>{
                this.props.navigation.navigate('HomeScreen')
            }}
        ]
    );
}
    render(){
        if(this.state.IsExchangeRequestActive===true){
            return(
                <View style={{flex: 1,justifyContent: 'center'}}>
                <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems: 'center',padding:10,margin:10}}>
                    <Text style={{color:"gray",borderWidth:1.5}}>Item Name</Text>
                    <Text>{this.state.requestedBookName}</Text>
                </View>

                <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems: 'center',padding:10,margin:10}}>
                    <Text>Item Status</Text>
                    <Text>{this.state.itemStatus}</Text>
                </View>

                <TouchableOpacity 
                onPress={()=>{
                  this.sendNotification()
                  this.updateExchangeRequestStatus()
                  this.receivedItems(this.state.requestedItemName)
                }}
                style={{borderWidth:1,borderColor:"orange",backgroundColor:"orange",width:300,height:300,borderRadius:150}}>
                  <Text>I received the Item</Text>
                </TouchableOpacity>
              </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    <MyHeader title="Add Item" navigation={this.props.navigate}/>

                    <TextInput
                    style={styles.txtInput}
                    placeholder="Item Name"
                    onChangeText={(text)=>{
                        this.setState({
                            itemName:text
                        })
                    }}/>
                    <TextInput
                    style={styles.txtInput}
                    placeholder="Description"
                    onChangeText={(text)=>{
                        this.setState({
                            description:text
                        })
                    }}/>
    
                <TouchableOpacity       
                style={styles.btn}
                onPress={()=>{this.addItem(this.state.itemName,this.state.desc)}}>
                <Text style={{color:'ffff',fontSize:'18',fontWeight:'bold'}}>Add Item</Text>
                </TouchableOpacity>
                </View>
            )
        }
    }    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn:{
        width:200,
        height:100,
        borderRadius:50,
        alignItems: 'center',
        marginTop:10,
        backgroundColor: 'orange',
    },
    txtInput:{
        borderWidth:1.5,
        marginTop:5,
        borderColor:'orange'
    },
    scroll:{
        flex:1,
        backgroundColor: 'peach',
        textAlign: 'center',
    },
  });