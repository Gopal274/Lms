import React from 'react'
import {Tabs} from 'expo-router'
const TabLayout = () => {
  return (
     <Tabs screenOptions={{headerShown:true, headerTitleStyle: { fontWeight: 'bold', color: '#1e3a8a' }, headerTintColor: '#1e3a8a'}}>
     <Tabs.Screen name="home" options={{title:"Browse Courses"}}/>
     <Tabs.Screen name="history" options={{title:"My Learning"}}/>
     <Tabs.Screen name="doubts" options={{title:"Doubts"}}/>
     <Tabs.Screen name="resources" options={{title:"Materials"}}/>
     <Tabs.Screen name="plans" options={{title:"Subscriptions"}}/>
     <Tabs.Screen name="profile" options={{title:"Profile"}}/>

     </Tabs>
  )
}

export default TabLayout