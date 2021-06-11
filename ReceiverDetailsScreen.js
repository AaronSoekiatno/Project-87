import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config'
export default class ReceiverDetailScreen extends React.Component{
constructor(){
    super();
    this.state = {
        receiverId:'',
        userId:'',
        exchangeId:'',
        itemName:'',
        userName:'',
    }
}

addNotification=()=>{
    var message = this.state.userName+" has shown interest in exchanging the item";
    db.collection("all_notification").add({
        'targeted_user_id':this.state.receiverId,
        'donor_id':this.state.userId,
        'exchangeId':this.state.exchangeId,
        'item_name':this.state.itemName,
        'date':firebase.firestore.FieldValue.serverTimestamp(),
        'notification_status':'unread',
        'message':message
    })
}

render(){
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            style={styles.btn}
            onPress={()=>{this.addNotification()}}>
                <Text style={{alignSelf:'center', textColor:'white'}}>Exchange</Text>
            </TouchableOpacity>
        </View>
    )
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
        width:100,
        height:100,
        borderRadius:50,
        alignItems: 'center',
        marginTop:10,
        backgroundColor: 'orange',
    },
  });