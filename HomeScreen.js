import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput, FlatList} from 'react-native';
import MyHeader from '../components/MyHeader'
export default class HomeScreen extends React.Component {
constructor(){
    super();
    this.state={
        keyExtractor:'',
        allRequests:[],
    }
}

renderItem=({item,i})=>{
    console.log(item.itemName);
    return (
        <ListItem
        key={i}
        title={item.itemName}
        subtitle={item.description}
        titleStyle={{color:'black',fontWeight:'bold'}}
        rightElement={
            <TouchableOpacity 
            style={styles.btn}
            onPress={()=>{this.props.navigation.navigate('UserDetailsScreen',{"details":item})}}
            >
                <Text style={{color:'ffff'}}>Exchange</Text>
            </TouchableOpacity>
        }
        />
    )
}
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allRequests}
                renderItem={this.renderItem}
                />
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