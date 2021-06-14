import * as React from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase';
import { Avatar, Icon } from "react-native-elements";

export default class customSideBarMenu extends React.Component {
constructor(){
  super();
  this.state = {
    userId: firebase.auth().currentUser.email,
    image: "#",
    name: "",
    docId: "",
  }
}

selectPicture = async () => {
  const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!cancelled) {
    this.uploadImage(uri, this.state.userId);
  }
};

uploadImage = async (uri, imageName) => {
   //to upload the image to the cloud storage
  var response = await fetch(uri);
  var blob = await response.blob();

  var ref = firebase.storage().ref().child("user_profiles/" + imageName);

  return ref.put(blob).then((response) => {
    this.fetchImage(imageName);
  });
}
    render(){
        return (
            <View style={{flex:1}}>
            <View style={styles.drawerItemsContainer}>
              <DrawerItems {...this.props}/>
            </View>
            <View style={styles.logOutContainer}>
              <TouchableOpacity style={styles.logOutButton}
              onPress = {() => {
                  this.props.navigation.navigate('SignupLoginScreen')
                  firebase.auth().signOut()
              }}>
                <Text style={styles.logOutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
    }
}


var styles = StyleSheet.create({
    drawerItemsContainer:{
      flex:0.8
    },
    logOutContainer : {
      flex:0.2,
      justifyContent:'flex-end',
      paddingBottom:30
    },
    logOutButton : {
      height:30,
      width:'100%',
      justifyContent:'center',
      padding:10
    },
    logOutText:{
      fontSize: 30,
      fontWeight:'bold'
    }
  })
