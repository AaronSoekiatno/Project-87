import React from 'react';
import {Dimensions, View, Text, StyleSheet, Animated} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view'

export default class SwipeableFlatlist extends React.Component {
constructor(){
    super();
    this.state = {
        allNotification:this.props.allNotification
    }
}

onSwipeValueChange=swipeData=>{
    var all_notifications = this.state.allNotification;
    const{key,value} = swipeData;
    if(value<-Dimensions.get("window").width){
        const newData = [...all_notifications];
        this.updateMarkasRead(all_notifcations[key]);
        newData.splice(key,1);
        this.setState({
            allNotification:newData
        })
    }
}

updateMarkasRead=(notification)=>{
    db.collection("all_notifications").doc(notification.doc_id).update({
        "notification_status":"read",
    })
}
renderItem=data=>{
    <Animated.View>
        <ListItem
        leftElement={
            <Icon name="book" type="font-awesome" color="#696969"/>
        }
        title={data.item.book_name}
        titleStyle={{color: 'black', fontWeight: 'bold' }}
        subtitle={data.item.message}
        bottomDivider
        />
    </Animated.View>
}

renderHiddenItem=()=>{
    <View style={styles.rowBack}>
        <View style={styles.backRightButton}>
            <Text style={style.backTxt}>Marked as Read</Text>
        </View>
    </View>
}

    render(){
        return(
            <View style={styles.container}>
                <SwipeListView
                disableRightSwipe
                data = {this.state.allNotification}
                renderItem={this.renderItem()}
                renderHiddenItem={this.renderHiddenItem()}
                rightOpenValue = {-Dimensions.get("window").width}
                previousRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center'
    },
    rowBack:{
        alignItems:'center',
        justifyContent: 'space-between',
        flex:1,
        flexDirection:'row',
        backroundColor:'#29b6f6',
        paddingLeft:15
    },
    backRightButton:{
        alignItems:'center',
        bottom:0,
        justifyContent:'center',
        position:'absolute',
        top:0,
        width:100,
    },
    backTxt:{
        color:'white',
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        alignSelf:'flex-start',
    }
})