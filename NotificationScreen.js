import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import SwipeableFlatlist from '../components/SwipeableFlatlist';
export default class NotificationScreen extends React.Component {
constructor(){
    super();
this.state = {
    allNotification:[],
}
}

keyExtractor = (item,index) => index.toString();
renderItem=({item,i})=>{
    return(
        <ListItem
            key={i}
            title={item.itemName}
            subtitle={item.description}
            titleStyle={{color:'black',fontWeight:'bold'}}
            rightElement={
                <TouchableOpacity 
                style={styles.btn}
                >
                <Text style={{color:'white'}}>Exchange</Text>
                </TouchableOpacity>
            }
            />
    )
}

    render(){
        return(
            <View>
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allNotification}
                renderItem={this.renderItem}
                />
                <SwipeableFlatList
                    allNotification = {this.state.allNotification}
                    />
            </View>
        )
    }
}