import {
    Image,
    View,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Text,
    Pressable,
    Modal
  } from 'react-native';
  import { MaterialIcons } from '@expo/vector-icons'; 
  import { useEffect, useState } from 'react';
  import ImageView from "react-native-image-viewing";
  
  // install this.  npm install --save react-native-image-viewing
  
    //   const images = [
    //       {id:'IMG_1',uri:'https://i.pinimg.com/236x/cd/5f/16/cd5f16e1dd6ce0d458a5a3a553545096.jpg'},
    //       {id:'IMG_2',uri:'https://i.pinimg.com/236x/0b/8c/06/0b8c062e862a52ebd108caaa04004be8.jpg'},
    //       {id:'IMG_3',uri:'https://i.pinimg.com/originals/15/26/65/152665a9262714a0b924235529a3fec7.jpg'},
    //       {id:'IMG_4',uri:'https://i.pinimg.com/236x/cd/5f/16/cd5f16e1dd6ce0d458a5a3a553545096.jpg'},
    //       {id:'IMG_5',uri:'https://i.pinimg.com/550x/58/be/03/58be031ee4bf84378e1fdf353f9849d4.jpg'},
    //       {id:'IMG_6',uri:'https://yt3.ggpht.com/ytc/AMLnZu8RoU5MjaAayWDDzUlOU2XcVq1sZWxS-lfMLB8Wfw=s900-c-k-c0x00ffffff-no-rj'},
    //       {id:'IMG_7',uri:'https://cdn.sharechat.com/Anahitababy..._efc748e5-3d94-4c25-94d2-852411dec563-57c1383b-793a-42eb-baae-5a1fc1e61a98_cmprsd_40.jpg'},
    //       {id:'IMG_8',uri:'https://media.fuzia.com/assets/uploads/images/co_brand_1/article/2020/1586222795101-images-4.jpeg'},
    //       {id:'IMG_9',uri:'https://cdn-cf.sharechat.com/312a5c25-fad1-4110-9bf0-927dd180f41c-5384cd43-5311-4ff6-bebc-7594e902750c_compressed_thumb.jpeg'},
    //       {id:'IMG_10',uri:'https://cdn.sharechat.com/anahithafans_5232ba0_1599371810726_cmprsd_40.jpg'}];
  
  
      //  <ChatImages
      //                  images={images}
      //                  style={{backgroundColor:'#93C01F'}}
      //                  extra="12/03/2033"
      //                  title="Testing title"
      //                  titleStyle={{color:'#707070'}}
      //                />
  
  const ChatImages = (props) => {
  
          const {images} = props;
          const {imageWidth} = props;
          const [visible,setVisible] = useState(false);
          const [zommvisible,setVisibleZoom] = useState(false);
  
        const viewfullScreen = () => {
           setVisible(false);
           setVisibleZoom(true);
        }
  
        let titleSyl = [
           {flex:1,fontSize:15,paddingHorizontal:6,paddingVertical:6}
        ];
  
        if(props.titleStyle != undefined){
           titleSyl.push(props.titleStyle);
        }
  
      return (
          <View style={[styles.container,props.style,{ margin:15,}]}>
              {
                  props.title != undefined &&
                  <Text style={titleSyl}>{props.title}</Text>
              }
           <View style={[styles.container,props.style]}>
  
             <ImageView
                  images={images}
                  imageIndex={0}
                  visible={zommvisible}
                  onRequestClose={() => setVisibleZoom(false)}
                  />
  
             <Modal
                 transparent
                 visible={visible}
                 >
                 <View style={styles.modalViewContainer}>
                     <View style={styles.modalSubContainer}>
                         <MaterialIcons onPress={()=>setVisible(false)} name="keyboard-arrow-left" size={45} color="black" />
                         <ScrollView style={{flex:1}}><View style={{flex:1,paddingHorizontal:5,paddingBottom:10}}>
                              {
                                  images.map((item,indx) => {
                                      return <Pressable onPress={viewfullScreen}><Image style={styles.fullIMG} source={{uri:item.uri}} /></Pressable>
                                  })
                              }
                         </View></ScrollView>
                     </View>
                 </View>
             </Modal>
  
  
             {
                 images.length >= 4 &&
                 images.map((item,indx) => {
                     if(indx < 3 || images.length == 4) {
                        return <Pressable onPress={()=>setVisible(true)}><Image style={styles.imageDesign} source={{uri:item.uri}} /></Pressable>
                      }
                      else if(indx == 3 && images.length > 4){
                        return (  <ImageBackground style={styles.imageDesign} source={{uri:item.uri}}>
                              <Pressable onPress={()=>setVisible(true)} style={{width:'100%',height:'100%'}}>
                                  <Text style={styles.countText}>{images.length - 4}+</Text>
                              </Pressable>
                          </ImageBackground> );
                      }
  
                 })
             }
  
             {
                 images.length == 1 &&
                   <Pressable onPress={()=>setVisible(true)}><Image style={[styles.imageDesign,{width:202,height:201}]} source={{uri:images[0].uri}} /></Pressable>
  
             }
  
             { 
                 (images.length == 2 || images.length == 3) && 
                 images.map((url,index)=>{
                  return ( <Pressable onPress={()=>setVisible(true)}><Image style={styles.imageDesign} source={{uri:url.url}} /> </Pressable>);
                 })
             }
  
             {
                images.length == 3 &&
                <View style={{width:110,height:110,backgroundColor:'#ececec',marginRight:-10,marginBottom:-10}}></View> 
             }
                  
          </View>
  
            {
              props.extra != undefined && 
              <Text style={{marginLeft:'auto',paddingRight:8,paddingBottom:2,fontSize:14,marginTop:10,fontWeight:'500'}}>{ props.extra}</Text>
          } 
             
          </View>
      );
  }
  
  const styles = StyleSheet.create({
    container:{
      width:207.5,
      borderRadius:10,
      padding:1,
      backgroundColor:'#93C01F',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'center',
      alignItems:'center'
    },
    imageDesign:{
     width:100,
     height:100,
     borderRadius:6,
     margin:1
    },
    countText:{
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        width:'100%',
        height:'100%',
        backgroundColor:'#00000099',
        textAlign:'center',
        textAlignVertical:'center'
    },
    modalViewContainer:{
        flex:1,
        backgroundColor:'#00000099',
        justifyContent:'center',
        alignItems:'center',
    },
    modalSubContainer:{
        width:'96%',
        backgroundColor:'white',
        height:'95%',
        borderRadius:10,
          shadowColor: 'gray',
        shadowRadius: 6,
        shadowOpacity: 1,
        elevation:6
    },
    fullIMG:{
        width:'100%',
        aspectRatio: 6/6,
        marginTop:10
    }
  
  });
  
  export default ChatImages;
  
  
  