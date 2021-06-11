import firebase from 'firebase';
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Card} from 'react-native';

export default class UserDetailsScreen extends React.Component {
    constructor(){
        super();
        this.state={
        userId:firebase.auth().currentUser.email,
        receiverId:this.props.navigation.getParam('details')["user_Id"],
        requestId:this.props.navigation.getParam('details')['request_id'],
        bookName:this.props.navigation.getParam('details')['book_name'],
        reason_for_requesting:this.props.navigation.getParam('details')['reason_for_requesting'],
        receiverName:'',
        receiverContact:'',
        receiverAddress:'',
        receiverRequestDocId:'',
        userName:'',
        }
    }

    addBarters=()=>{
        db.collection('MyBarters').add({
            itemName:'',
            exchangerName:'',
            exchangerContact:'',
            exchangeStatus:'',
            exchangeId:'',
            exchangerAddress:'',
        })
    }

    getUserDetails=()=>{
        var username = firebase.auth().currentUser.username;
        db.collection('users').where("username","==",username).get()
        .then(snapshot =>{
            snapshot.forEach(doc=>{
                var data = doc.data();
                this.setState({
                userId:doc.data().first_name+" "+doc.data().last_name,
                })
            })
        })

    }

    render(){
        return (
            <View>

            </View>
        )
    }
}