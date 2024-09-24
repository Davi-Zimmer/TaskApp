import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, StatusBar, Button, TextInput, ScrollView} from 'react-native';


import Task from './Task';
import TaskModal from './interfaces/taskModal';
import { useEffect, useState } from 'react';

const storage = {
  set: async (data) => {
    try {
      const dataJson = JSON.stringify( data )
      await AsyncStorage.setItem( "Tasks", dataJson )
    } 
    catch (err){ console.error(err) }
  },

  get: async () => {

      try {
        const dataJson = await AsyncStorage.getItem('Tasks')

        return dataJson != null ? JSON.parse(dataJson) : null;
      }
      catch (err){console.error(err)}
  }
}

function today(){
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const date = new Date()
  
  return days[ date.getDay() ]
}

function createTask(title, subtitle, termDate){

  return {
    title,
    subtitle,
    creationDate: today(),
    termDate,
    status: "Pending"
  }
}

function defaultList(){
  return [
    createTask('esquecer de respirar 1', 'não respire', '16/2/2025'),
    createTask('esquecer de respirar 2', 'não respire', '16/2/2025'),
    createTask('esquecer de respirar 3', 'não respire', '16/2/2025'),
    createTask('esquecer de respirar 4', 'não respire', '16/2/2024'),
    createTask('esquecer de respirar 5', 'não respire', '20/9/2024'),
  ]
}

function Main(tasksBase, setTasksBase){
  
  const [tasksView, setTasksView] = useState( tasksBase )

  const [ modalVisible, setModalVisible ] = useState( false )

  const [search, setSearch] = useState("")

  function saveAndUpdate( data ){
    storage.set ( data )
    setTasksBase( data )
  }

  function addNewTask( data ){          
    saveAndUpdate( [...tasksBase, data ] )
  }

  function updateTaskStatus( index ){
    const _tasksBase = tasksBase.map( (item, i) => {
    
      if(i == index){ item.status = item.status == "Pending" ? "Done" : "Pending" }
      
      return item

    })

    saveAndUpdate( _tasksBase )

  }

  async function getStoredData(){
    const storageData = await storage.get() || defaultList()
    setTasksBase( storageData )
  }

  useState( () => {
    getStoredData()
  }, [])

  useEffect( () => {
    setTasksView( tasksBase )
  }, [ tasksBase ])

  useEffect(() => {
    if( search == "") {
      setTasksView( tasksBase )
      return
    }

    const n = tasksBase.filter(task => {
      const Alldata = `${task.title} ${task.subtitle}`.toLowerCase()

      return Alldata.includes( search )
    })

    setTasksView( n )
    console.log(tasksView)

  }, [search])


  function createNewTask(){
    setModalVisible( !modalVisible )
  }

  return (<View style={styles.window}>

    <View style={styles.header}>

      <View style={styles.headerText}>
        <Text>Today's Task</Text>
        <Text>{today()}</Text>
      </View>

      <Text style={styles.newTask} onPress={createNewTask}>New Task</Text>
    </View>

    <View style={styles.tasksNav}>
      <Text>All</Text>
      <Text>Open</Text>
      <Text>Closed</Text>
      <Text>Archived</Text>
    </View>

    <TextInput value={search} onChangeText={setSearch} placeholder='filter'/>

    <ScrollView style={styles.tasks}>

      {tasksView.map((item, index) => Task({...item, index}, updateTaskStatus))}

    </ScrollView>
    
    {TaskModal(modalVisible, setModalVisible, addNewTask)}
    </View>)
}

function LastActivity( txt ){
  return (
      <View>
          <Text>
              {txt}
          </Text>
      </View>
  )   
}


function ASD( d ){

  const [tasksBase, setTasksBase] = useState([])

  useEffect(() => {
    (async function (){
      const storageData = await storage.get()
      setTasksBase(storageData.filter(item => item.status == "Done"))
    })()
  }, [d])


  return (
    <View>
      {
        tasksBase.length == 0 ? <Text>Não há atividades recentes na aplicação.</Text>
          : 
        tasksBase.map((item, index) => Task({...item, index}))
        }
    </View>
  )

}


export default function App() {

  const [windowIndex, setWindowIndex] = useState(0)
  const [tasksBase, setTasksBase] = useState([])


  const windows = [
    ASD(tasksBase),
    Main(tasksBase, setTasksBase),
    LastActivity( "Não há mensagens para serem lidas." ),
  ]


  return (
    <View style={styles.container}>

      <StatusBar />

      <View style={styles.headerContainer}>
        <Text onPress={() => setWindowIndex(0)}>Last Activity</Text>
        <Text onPress={() => setWindowIndex(1)}>Tasks</Text>
        <Text onPress={() => setWindowIndex(2)}>Messages</Text>
      </View>

      {windows[windowIndex]}

        
    </View>
  );
}

const styles = StyleSheet.create({
  window: {
    width: "100%",
    alignItems: "center",
    height: "100%"
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 5,
    backgroundColor: "gray"
  },

  tasks : {
    width: "90%",
    zIndex: "10"
  },

  tasksNav:{
    flexDirection: "row",
    width: "100%",
    justifyContent: 'space-around',
  },

  newTask: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'aqua',
    borderRadius: 5
  },

  headerText: {


  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "yellow",
    alignItems: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});


