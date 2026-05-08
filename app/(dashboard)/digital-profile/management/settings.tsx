import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Checkbox from 'expo-checkbox'

import PageTitle from '../../components/PageTitle'

const Settings = () => {

    const [orderMode, setOrderMode] = useState('online')
    const [showReadyButton, setShowReadyButton] = useState(true)

    return (
        <ScrollView
            className="flex-1 bg-slate-50 mb-26"
            showsVerticalScrollIndicator={false}
        >
            <View className="px-4 pt-4 pb-8">

                <PageTitle
                    title="Paramètres"
                />

                <View className=' bg-white rounded-2xl p-4 shadow-sm'>

                    {/* Header */}
                    <View>
                        <View className='items-center flex-row gap-x-2'>
                            <Text className='font-medium text-gray-600'>
                                Mode de commande
                            </Text>

                            <Text className='bg-sky-100 px-2 py-0.5 rounded-lg text-sky-600 text-xs'>
                                important
                            </Text>
                        </View>

                        <Text className='text-sm text-gray-500 mt-1 leading-5'>
                            Choisissez comment vos clients passent leurs commandes.
                            Vous pouvez activer la commande en ligne classique ou
                            permettre uniquement l’ajout au panier sans paiement.
                        </Text>
                    </View>

                    <View className='w-full h-px bg-gray-300 my-4' />

                    {/* Radio options */}
                    <View className=' gap-y-4'>

                        {/* Option 1 */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setOrderMode('online')}
                            className='flex-row items-start gap-x-3'
                        >

                            {/* Radio */}
                            <View className={`w-5 h-5 rounded-full border-2 items-center justify-center mt-0.5 ${
                                orderMode === 'online'
                                    ? 'border-sky-500'
                                    : 'border-gray-300'
                            }`}>
                                {
                                    orderMode === 'online' &&
                                    <View className='w-2.5 h-2.5 rounded-full bg-sky-500' />
                                }
                            </View>

                            {/* Content */}
                            <View className='flex-1'>
                                <Text className='font-medium text-gray-800'>
                                    Commande en ligne
                                </Text>

                                <Text className='text-sm text-gray-500 mt-1 leading-5'>
                                    Les clients peuvent ajouter au panier et finaliser
                                    leur commande directement en ligne.
                                </Text>
                            </View>

                        </TouchableOpacity>

                        {/* Option 2 */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setOrderMode('cart_only')}
                            className='flex-row items-start gap-x-3'
                        >

                            {/* Radio */}
                            <View className={`w-5 h-5 rounded-full border-2 items-center justify-center mt-0.5 ${
                                orderMode === 'cart_only'
                                    ? 'border-sky-500'
                                    : 'border-gray-300'
                            }`}>
                                {
                                    orderMode === 'cart_only' &&
                                    <View className='w-2.5 h-2.5 rounded-full bg-sky-500' />
                                }
                            </View>

                            {/* Content */}
                            <View className='flex-1'>
                                <Text className='font-medium text-gray-800'>
                                    Panier uniquement
                                </Text>

                                <Text className='text-sm text-gray-500 mt-1 leading-5'>
                                    Les clients peuvent ajouter des articles au panier
                                    sans passer de commande en ligne. Ils doivent
                                    confirmer leur sélection avec vous.
                                </Text>
                            </View>

                        </TouchableOpacity>

                    </View>

                    {/* Checkbox */}
                    <View className='mt-6'>

                        <Text className='text-sm font-medium text-gray-700 mb-3'>
                            Bouton d’action
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setShowReadyButton(!showReadyButton)}
                            className='flex-row items-start gap-x-3'
                        >

                            <Checkbox
                                value={showReadyButton}
                                onValueChange={setShowReadyButton}
                                color={showReadyButton ? '#0ea5e9' : undefined}
                                style={{
                                    width: 19,
                                    height: 19,
                                    borderRadius: 6
                                }}
                            />

                            {/* Content */}
                            <View className='flex-1'>
                                <Text className='font-medium text-gray-800'>
                                    Afficher "Je suis prêt à commander"
                                </Text>

                                <Text className='text-sm text-gray-500 mt-1 leading-5'>
                                    Ajoute un bouton visible permettant aux clients
                                    d’indiquer qu’ils sont prêts à passer commande.
                                </Text>
                            </View>

                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </ScrollView>
    )
}

export default Settings

const styles = StyleSheet.create({})