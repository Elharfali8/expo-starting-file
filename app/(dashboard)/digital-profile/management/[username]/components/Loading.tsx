import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 px-6">
            <View className="bg-white border border-slate-200 rounded-3xl px-8 py-10 items-center w-full">
              <View className="w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-4">
                <View className="w-8 h-8 rounded-full bg-slate-900 animate-pulse" />
              </View>
    
              <Text className="text-lg font-semibold text-slate-900">
                Chargement des services
              </Text>
    
              <Text className="text-sm text-slate-500 text-center mt-2 leading-5">
                Veuillez patienter pendant la récupération de vos services.
              </Text>
            </View>
          </View>
  )
}

export default Loading

const styles = StyleSheet.create({})