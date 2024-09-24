import React, { useState } from 'react';
import { StyleSheet, View, Text } from "react-native" 

export default function Task( {title, subtitle, status, creationDate, termDate, index}, updateTask){

    const id = index

    function changeStatus(){
        //const tasks = _setTasksBase

        if(updateTask) updateTask(id, status)
        
    }

    function checkStatus(){
        return status == "Done" ? styles.statusDone: styles.statusPending
    }

    return (
        <View style={styles.taskContainer} >
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            <View style={styles.taskFooter}>
                <View style={styles.dates}>
                    <Text>{creationDate}</Text>
                    <Text>{termDate}</Text>
                </View>


                <Text onPress={changeStatus} style={checkStatus()}>{status}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    statusDone: {
        color: "lime"
    },
    
    statusPending: {
        color: "orange"
    },

    taskFooter: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    dates: {
        flexDirection: "row",
        gap: 5
    },

    title:{
        fontSize: 20,
    },

    subtitle:{
        fontSize: 15,
    },

    taskContainer: {
        backgroundColor: "gray",
        padding: 1,
        padding: 10
    },
})
