import React , {useState} from "react";
import {View,Text, TouchableOpacity,TextInput} from 'react-native';
import { useEffect } from "react/cjs/react.development";
import { COLORS } from "../constants";



var s = require('../style')
//item in the list
const PopupItem = ({name,onRemoved,onEdited})=> {
  const [editName, setEditName] = useState(null)
  const [showEdit, setShowEdit] = useState(false)

      useEffect(()=> {
        setEditName(name)
      },[])

      const onRemove =()=> {
        onRemoved(name)
      }

      const onEdit =()=> {
        onEdited(editName)
      }

      return (
        <View  style={{position:'absolute',bottom: 0 ,right:0,left:0,backgroundColor:'white',padding:15}}>
            <TouchableOpacity style={{padding:10}} onPress={()=> setShowEdit(!showEdit)}>
            <Text>Edit</Text>
          </TouchableOpacity>
          {showEdit &&
          <View style={s.rowSpaceBetween}>
            <TextInput  value={editName} onChangeText={(text)=> setEditName(text)}
              style={{backgroundColor:COLORS.colorBGsec,flex:0.8,marginRight:5,
                borderRadius:10,}}
            />
            <TouchableOpacity style={{
              borderRadius:10,
              padding:10,flex:0.2,justifyContent:'center',backgroundColor:COLORS.primary}} onPress={()=> onEdit()}>
              <Text style={{textAlign:'center',color:'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
          }
            <TouchableOpacity style={{padding:10}} onPress={()=> onRemove()}>
            <Text>Delete</Text>
          </TouchableOpacity>
      </View>
      );

  }


  export default PopupItem

  


  