import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    title: string
    subTitle?: string
}

export default function PageTitle({title, subTitle}: Props) {
  return (
    <View className="mb-6">
          <Text className={`text-2xl font-extrabold ${subTitle ? 'mb-1' : ''}`}>{title}</Text>
      {subTitle && (
        <Text className="text-gray-800">
          {subTitle}
        </Text>
        )}
      </View>
  )
}

const styles = StyleSheet.create({})