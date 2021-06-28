
import React , {useState,useEffect,useRef} from "react";
import {Image,View,Text, FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import  Icon  from "react-native-vector-icons/FontAwesome5";

// import { Container, Tab, Tabs } from 'native-base';


import {COLORS, SIZES, STYLE_DIR} from "../constants"

var s = require('../style')
let data = [ 
  {title:"some Name",
  year:1998,
  artist: "Bob Roben",
  genres:["Pop", "Rap"],
  cover: "https://pbs.twimg.com/profile_images/1345098814969974784/bXiRjVbT_400x400.jpg"
},
  {title:"Nothin' on You",
  year:2009,
  artist: "Bruno Mars",
  genres:["R&B", "Hip hop"],
  cover: "https://upload.wikimedia.org/wikipedia/he/6/6d/Bobnothinonyou.jpg"
},
  {title:"some Name2",
  year:1998,
  artist: "Bob Roben",
  genres:["Pop", "Rap"],
  cover: "https://pbs.twimg.com/profile_images/1345098814969974784/bXiRjVbT_400x400.jpg"
},
]
 const HomeScreen = ({navigation,route })=> {
       const [realData, setRealData] = useState(data)
       const [genres, setGeneres] = useState([])
       const [typeSelset, setTypeSelset] = useState('All')
        useEffect(()=>{
          let setGeneresTemp = []
          data.map((e)=>setGeneresTemp.push(...e.genres))
          setGeneres(['All',...new Set(setGeneresTemp)])
          
        },[])

    

      const selectGenres = async(val) => {
        let setData = val !== 'All' ?  data.filter((e)=> e.genres.includes(val)) : data
        setRealData(setData)
        setTypeSelset(val)
       
    
      }
      const moreOption = async(name) => {
       
       return (
         <View>
            <TouchableOpacity style={{padding:10}}>
            <Text>Edit</Text>
          </TouchableOpacity>
            <TouchableOpacity style={{padding:10}}>
            <Text>Delete</Text>
          </TouchableOpacity>
      </View>
       )
    
      }
    
      return (
  
        <View style={{flex:1,backgroundColor:COLORS.colorBGsec}}>
           <FlatList data={genres}
           horizontal
           style={{backgroundColor:'white',maxHeight:40}}
                 renderItem={({item,index})=> 
                 <TouchableOpacity style={{padding:10, }} onPress={()=>selectGenres(item)}>
                   <Text style={{
                     fontWeight:"bold",
                     color:item === typeSelset  ? "#a4b5e1" :  "#a4b5e178"}}>{item}</Text>
                 </TouchableOpacity>}
            />
                 <FlatList data={realData}
                      contentContainerStyle={{flexWrap:'wrap', 
                      padding:15,
                      justifyContent:'space-between',
                      flexDirection : "row"}}

                  numColumns={2}
                 renderItem={({item,index})=> 
                  <TouchableOpacity style={styles.album}>
                        <TouchableOpacity style={{position:'absolute',top: 15,right:15}}>
                        <Icon name={'ellipsis-v'} size={18}/>
                        </TouchableOpacity>
                    <Image source={{uri:item.cover}} style={{width:'100%', height:120, resizeMode:'cover'}}/>
                    <View style={[s.rowSpaceBetween,{padding:15}]}>
                      <Text>{item.artist}</Text>
                      <Icon name={'play'} size={18}/>
                    </View>
                  </TouchableOpacity> 
                }
            />
      </View>
      );
    }
  


export default HomeScreen

const styles = StyleSheet.create({
 
  album: {
    flexWrap:'wrap',
                      marginBottom:15,
                      borderRadius:20,
                      width:(SIZES.width / 2) - 30,
                      marginHorizontal:7.5,
                      overflow:'hidden',
                      backgroundColor:"white"         
  },
  Tab: {
    backgroundColor: COLORS.colorBGsec,
    borderWidth:0,
  },
  activeTabs: {
    backgroundColor: COLORS.colorBGsec,
    borderWidth:0,
  },
  underLine: {
    borderWidth: 0.3,
    backgroundColor:COLORS.primary
  },
});