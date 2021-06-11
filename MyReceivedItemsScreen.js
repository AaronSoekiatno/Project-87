import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ListItem } from 'react-native';

export default class MyReceivedItemsScreen extends React.Component {
constructor(){
    super();
    this.state = {
        userId:firebase.auth().currentUser.email,
        receivedItemList:[],
    }
    this.requestRef=null;
}

getReceivedItemList=()=>{
    this.requestRef = db.collection("received_items")
    .where("user_id","==",this.state.userId)
    .where("item_status","==","recieved")
    .onSnapshot((snapshot)=>{
        var receivedItemList = snapshot.docs.map((doc)=>doc.data())
        this.setState({receivedItemList:receivedItemList})
    })
}

componentDidMount(){
    this.getReceivedBookList()
}

keyExtractor=(item,index)=>{
    index.toString();
}

renderItem=({item,i})=>{
    return(
        <ListItem
        key = {i}
        title={item.item_name}
        subtitle={item.item_status}
        titleStyle= {{color: 'black', fontWeight: 'bold' }}
        bottomDivider
        />
    )
}

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="Received Items" navigation ={this.props.navigation}/>
    
                <View style={{flex:1}}>
                    {
                        this.state.receivedItemList.length===0?(
                        <View>
                            <Text>List of all Received Items</Text>
                        </View>
                        ):
                        (
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.receivedItemList}
                            renderItem={this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}