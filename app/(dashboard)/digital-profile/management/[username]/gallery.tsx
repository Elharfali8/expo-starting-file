import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageUploader from './components/UploadImage'
import ImageComponent from './components/ImageComponent'
import PaginationExample from './components/PaginationExample'
import PageTitle from '@/app/(dashboard)/components/PageTitle'

const gallery = () => {
  return (
    <ScrollView
          className="flex-1 bg-slate-50 mb-26"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 pt-4 pb-8">
              <PageTitle title="Ma galerie" subTitle="Téléchargez, gérez et organisez vos images. Vous pouvez ajouter jusqu'à 10 images par téléchargement, chacune d'un maximum de 10 Mo." />
              
              {/*  */}
              <View>
                  <ImageUploader onUpload={() => console.log("done")} />
              </View>

              {/*  */}
              <View className="mt-6">
                <View className="flex-row items-center gap-4 mb-4">
                    <View className="flex-1 h-px bg-slate-200" />

                    <Text className="text-slate-800 font-semibold text-lg">
                    Images
                    </Text>

                    <View className="flex-1 h-px bg-slate-200" />
                </View>

                <Text className="text-center text-slate-500 leading-6 text-sm px-2">
                    Parcourez toutes les images que vous avez téléchargées.
                    Cliquez sur une image pour l’afficher en grand ou la supprimer
                    de votre galerie.
                </Text>

              </View>
              
              

              {/* pagination */}
              <PaginationExample />
          </View>
          </ScrollView>
  )
}

export default gallery

const styles = StyleSheet.create({})