import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageTitle from '../../components/PageTitle'
import { CalendarArrowUp, Camera, Pencil, Phone } from 'lucide-react-native'

const profile = () => {
  return (
    <ScrollView
          className="flex-1 bg-slate-50 mb-26"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 pt-4 pb-8">
    
            <PageTitle
              title="Mon profile"
            />

              {/*  */}
             <View className='rounded-2xl shadow-lg overflow-hidden bg-[#f0f2f5]'>

    {/* Cover image */}
    <View className='h-[170px] relative'>
        <Image
            source={{
                uri: 'https://images.unsplash.com/photo-1549477606-43a329b26066?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }}
            className='w-full h-full'
        />

        {/* Edit cover */}
        <TouchableOpacity
            activeOpacity={0.8}
            className='bg-gray-100 absolute right-1 top-1 flex-row items-center gap-1 py-0.5 px-1 rounded-lg'
        >
            <Pencil size={14} />
            <Text className='text-sm font-medium'>modifier</Text>
        </TouchableOpacity>

        {/* Profile image */}
        {/* Profile image */}
<View className='absolute -bottom-11 left-0 right-0 items-center'>

    <View className='relative'>

        {/* Avatar */}
        <View className='w-28 h-28 rounded-full bg-gray-400 border-4 border-white overflow-hidden'>
            <Image
                source={{
                    uri: 'https://images.unsplash.com/photo-1604638823265-1cabe872a94a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }}
                className='w-full h-full'
            />
        </View>

        {/* Camera button */}
        <TouchableOpacity
            activeOpacity={0.8}
            className='absolute bottom-1 right-1 bg-white border border-gray-200 rounded-full p-2'
        >
            <Camera size={16} color="#374151" />
        </TouchableOpacity>

    </View>

</View>
    </View>

    {/* Bottom spacing so avatar doesn't overlap content */}
    <View className='mt-14 mb-6 px-4'>
                {/* Content */}
                <View className='flex-col items-center justify-between'>

        <Text className='text-xl font-bold mb-2 text-center'>
            Lorem ipsum dolor
        </Text>

        <Text className='text-center max-w-[80%] text-gray-600 leading-5'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Labore nostrum assumenda harum quibusdam eligendi quo?
        </Text>

                      </View>

        <View className='my-3 items-center justify-center'>
                          <View className='flex-row flex-wrap items-center gap-2 justify-between'>
                              <TouchableOpacity
                                  activeOpacity={0.8}
                                  className='bg-white px-3 py-0.5 items-center flex-row gap-2 rounded-lg border border-gray-300 shadow'
                              >
                                  <Phone size={16} />
                                  <Text>Appel</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                  activeOpacity={0.8}
                                  className='bg-white px-3 py-0.5 items-center flex-row gap-2 rounded-lg border border-gray-300 shadow'
                              >
                                  <CalendarArrowUp size={16} />
                                  <Text>Reserver</Text>
                              </TouchableOpacity>
            </View>
        </View>
                      
    <View className='flex-row items-center justify-between'>

        <Text className='text-sm font-medium text-gray-500'>
            Informations du profil
        </Text>

        <TouchableOpacity
            activeOpacity={0.8}
            className='flex-row items-center gap-1 bg-gray-100 px-3 py-1 rounded-full'
        >
            <Pencil size={14} color="#374151" />

            <Text className='text-sm font-medium text-gray-700'>
                Modifier
            </Text>
        </TouchableOpacity>

    </View>

</View>
    
</View>
          </View>
          </ScrollView>
  )
}

export default profile

const styles = StyleSheet.create({})