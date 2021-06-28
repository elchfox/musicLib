
import React , {useState,useEffect,useRef} from "react";
import {Image,View,Text, FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import  Icon  from "react-native-vector-icons/FontAwesome5";
import PopupItem from "../components/PopupItem";

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
       const [moreOptionOn, setMoreOptionOn] = useState(null)
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
      const onRemoved = async(name) => {
        let indexOf = data.findIndex((e)=> e.title === name)
        if(indexOf >= 0 ) {
         let d =  data.splice(indexOf , 1 )
          setRealData(data)
        }
        setMoreOptionOn(null)
      }
      const onEdited = async(editName,name) => {
        console.log(editName,name)
        let indexOf = data.findIndex((e)=> e.artist === name)
        console.log(indexOf)
        if(indexOf >= 0 ) {
         data[indexOf].artist = editName
          setRealData([...data])
        }
        setMoreOptionOn(null)
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
                      columnWrapperStyle={{ 
                      justifyContent:'space-between',
                      }}
                      style={{padding:15}}

                  numColumns={2}
                 renderItem={({item,index})=> 
                  <TouchableOpacity style={styles.album}>
                      <TouchableOpacity 
                      onPress={()=> setMoreOptionOn(item.artist)}
                      style={{
                          position:'absolute',top: 15,right:15,zIndex:2}}>
                        <Icon name={'ellipsis-v'} size={20}/>
                      </TouchableOpacity>
                    
                    <Image source={{uri:item.cover}} style={{width:'100%', height:120, resizeMode:'cover'}}/>
                    <View style={[s.rowSpaceBetween,{padding:15}]}>
                      <Text>{item.artist}</Text>
                      <Icon name={'play'} size={18}/>
                    </View>
                  </TouchableOpacity> 
                }
            />
            
              {moreOptionOn  !== null && <PopupItem name={moreOptionOn} 
              onRemoved={(name)=> onRemoved(name)}
              onEdited={(name)=> onEdited(name,moreOptionOn)}
              />}
      </View>
      );
    }
  


export default HomeScreen

const styles = StyleSheet.create({
 
  album: {
    position:'relative',
                      borderRadius:20,
                      marginBottom:15,
                      width:"48%",
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