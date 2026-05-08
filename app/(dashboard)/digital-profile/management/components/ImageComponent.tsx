import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Trash } from 'lucide-react-native';

const ImageComponent = () => {
  return (
    <View className="w-[48%] mb-4 relative shadow-md rounded-2xl">

      <View className="aspect-square bg-slate-100 rounded-2xl overflow-hidden items-center justify-center border border-slate-200">

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
          }}
          className="w-full h-full"
          resizeMode="contain"
        />

      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => console.log('delete')}
        className="absolute top-2 right-2 bg-white/90 border border-red-100 p-2 rounded-xl"
      >
        <Trash size={18} color="#ef4444" />
      </TouchableOpacity>

    </View>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({});