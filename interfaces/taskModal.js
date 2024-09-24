import { View, Text, StyleSheet, TextInput, Modal, Button } from "react-native"
import { useState } from 'react';

export default function TaskModal( modalVisible, setModalVisible, addNewTask ){

    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    
    const date = new Date()
    
    const [dd, mm, yy] = [date.getDate(), date.getMonth() + 1, date.getFullYear()]

    const [ day  , setDay   ] = useState(dd)
    const [ month, setMonth ] = useState(mm)
    const [ year , setYear  ] = useState(yy)
    
    function asd (){ 
      if(title.trim() == "") {console.error('undefined title'); return}
      if(subtitle.trim() == "") {console.error('undefined subtitle'); return}
          
      console.log( day, month, year, title, subtitle, dd, mm, yy )
      // save in local storage

        // _setTasksBase( )
        const newTask = {title, subtitle, 
          creationDate: `${dd}/${mm}/${yy}`,
          termDate: `${day}/${month}/${year}`,
          status: "Pending"
        }

        setModalVisible(false)
        addNewTask( newTask )
    }

    return (
        <View style={styles.centeredView}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                
                <View style={styles.taskCreator}>
                  <View>
                    <Text>Title</Text>
                    <TextInput onChangeText={setTitle}/>
                  </View>

                  <View>
                    <Text>Subtitle</Text>
                    <TextInput onChangeText={setSubtitle}/>
                  </View>

                    <View style={styles.dateContainer}>

                        <View style={styles.dateRow}><TextInput style={styles.dateInput} value={day  } onChangeText={ setDay   } keyboardType="numeric" placeholder="dd" /></View><Text>/</Text>
                        <View style={styles.dateRow}><TextInput style={styles.dateInput} value={month} onChangeText={ setMonth } keyboardType="numeric" placeholder="mm" /></View><Text>/</Text>
                        <View style={styles.dateRow}><TextInput style={styles.dateInput} value={year } onChangeText={ setYear  } keyboardType="numeric" placeholder="yyyy" /></View>

                    </View>

                </View>

                <View style={styles.buttonsContainer}>
                    
                    <Button title="Cancel" style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                    </Button>

                    <Button title="Save" onPress={() => asd()}></Button>
                </View>
            </View>
          </View>
        </Modal>
       
      </View>
    )   
}



const styles = StyleSheet.create({

    dateRow: {
        flexDirection: "row",
        width: "15%",
    },

    dateInput: {
        width: "100%",
        textAlign: "center"
    },

    dateContainer: {
        flexDirection: 'row',
    },

    taskCreator: {
        backgroundColor: 'red',
        height: "90%",
        padding: 10,
        marginBottom: 10,
        gap: 20
    },

    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },

    buttonsContainer:{
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 20
    },

    modalView: {
        width: "80%",
        height: "80%",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignItems: "stretch"


    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },

    buttonOpen: {
      backgroundColor: '#F194FF',
    },

    buttonClose: {
      backgroundColor: '#2196F3',
    },

    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
});
  