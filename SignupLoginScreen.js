import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput, Alert, Modal,ScrollView } from 'react-native';
import * as firebase from 'firebase';
import db from '../config'
export default class SignupLoginScreen extends React.Component {
constructor(){
    super();
    this.state={
        username:'',
        password:'',
        isVisible:true,
        firstName:'',
        lastName:'',
        number:'',
        address:'',
        confirmPassword:'',
    }
}

showModal=()=>{
    return(
    <Modal  
    animationType="fade"
    transparent={true}
    visible={this.state.isVisible}>
    
    <ScrollView style={styles.scroll}>
        <View style={{justifyContent:'center',alignSelf:'center',}}>
            <Text style={{fontSize:24,fontWeight:'bold',alignItems:'center',}}>Sign Up</Text>
        </View>

        <View style={styles.signUp}>
            <Text>First Name</Text>
            <TextInput
            style={styles.txtInput}
            placeholder="First Name"
            onChangeText={(text)=>{
                this.setState({
                    firstName:text
                })
            }}            
            />

            <Text>Last Name</Text>
            <TextInput
            style={styles.txtInput}
            placeholder="Last Name"
            onChangeText={(text)=>{
                this.setState({
                    lastName:text
                })
            }}            
            />

            <Text>Address</Text>
            <TextInput
            style={styles.txtInput}
            placeholder="Address"
            onChangeText={(text)=>{
                this.setState({
                    address:text
                })
            }}            
            />

            <Text>Contact</Text>
            <TextInput
            style={styles.txtInput}
            placeholder="Phone Number"
            onChangeText={(text)=>{
                this.setState({
                    number:text
                })
            }}            
            />

            <Text>Username</Text>
            <TextInput
            style={styles.txtInput}
            placeholder="Username"
            onChangeText={(text)=>{
                this.setState({
                    username:text
                })
            }}            
            />

            <Text>Password</Text>
            <TextInput
            style={styles.txtInput}
            placeholder="Password"
            onChangeText={(text)=>{
                this.setState({
                    password:text
                })
            }}            
            />

            <Text>Confirm Password</Text>
            <TextInput
            style={styles.txtInput}
            placeholder="Confirm Password"
            onChangeText={(text)=>{
                this.setState({
                    confirmPassword:text
                })
            }}            
            />

            <TouchableOpacity
            style={styles.btn}
            onPress={()=>{this.userSignUp(this.state.username,this.state.password )}}
            >
            <Text style={{marginTop:40}}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.cancel}
            onPress={()=>{
                this.setState({
                isVisible:false
            })
        }}
            >
            <Text style={{marginTop:40}}>Cancel</Text>
            </TouchableOpacity>
            
        </View>
        </ScrollView>
    </Modal>
    )
}

userLogin=(username,password)=>{
    firebase.auth().signInWithEmailAndPassword(username,password)
    .then(()=>{
        return Alert.alert("Successfully Login")
    })
    .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
    });
}

userSignUp = (username,password)=>{
    if(this.state.password!==this.state.confirmPassword){
        return Alert.alert("Password doesn't match. Check your password.");
    }else{
        firebase.auth().createUserWithEmailAndPassword(username,password)
        .then((response)=>{
            return Alert.alert(
                'User added successfully',
                '',
                [
                    {text:'OK',onPress:()=>this.setState({"isVisible":false})}
                ]);
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        });
    }
}

    render(){
      return(
        <View style={styles.container}>
            <Text style={{
                marginBottom:100,
                alignSelf: 'center',
                justifyContent: 'center',
                fontSize:26,
               fontWeight: 'bold',
                }}>Barter App</Text>

            <TextInput
            style={styles.txtInput}
          placeholder="Type your username"
          keyboardType="email-address"
          onChangeText={(text)=>{
              this.setState({
                  username: text
              })
          }}
          />

            <TextInput
            style={styles.txtInput}
          placeholder="Type your password"
          secureTextEntry="true"
          onChangeText={(text)=>{
              this.setState({
                  password:text
              })
          }}
          />
            <TouchableOpacity
            style={styles.btn}
            onPress={()=>{this.userLogin(this.state.username,this.state.password)}}
            >
            <Text style={{marginTop:40}}>Login</Text>
            </TouchableOpacity>
            {this.showModal()}
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
        backgroundColor: 'cyan',
    },
    cancel:{
        width:100,
        height:100,
        borderRadius:50,
        alignItems: 'center',
        marginTop:10,
        backgroundColor: 'red',
    },
    txtInput:{
        borderWidth:1.5,
        marginTop:5
    },
    scroll:{
        flex:1,
        backgroundColor: 'peach',
        textAlign: 'center',
    },
  });