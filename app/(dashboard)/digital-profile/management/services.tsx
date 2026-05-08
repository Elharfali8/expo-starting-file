import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, { useMemo, useState } from 'react';

import PageTitle from '../../components/PageTitle';
import { Pencil, Plus, Trash } from 'lucide-react-native';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Création de site web',
      description:
        'Développement de sites modernes, rapides et adaptés à tous les appareils.',
      image:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    },
    {
      id: 2,
      title: 'Design UI/UX',
      description:
        'Conception d’interfaces intuitives et expériences utilisateurs optimisées.',
      image:
        'https://images.unsplash.com/photo-1559028012-481c04fa702d',
    },
    {
      id: 3,
      title: 'Marketing digital',
      description:
        'Gestion des campagnes publicitaires et stratégie de visibilité en ligne.',
      image:
        'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
    },
    {
      id: 4,
      title: 'Gestion des réseaux sociaux',
      description:
        'Création et publication de contenus pour développer votre audience.',
      image:
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    },
    {
      id: 5,
      title: 'Photographie produit',
      description:
        'Photos professionnelles pour mettre en valeur vos produits et services.',
      image:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    },
    {
      id: 6,
      title: 'Montage vidéo',
      description:
        'Réalisation et édition de vidéos promotionnelles et réseaux sociaux.',
      image:
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d',
    },
  ];

  const ITEMS_PER_PAGE = 4;

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(
    services.length / ITEMS_PER_PAGE
  );

  const paginatedServices = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return services.slice(start, end);
  }, [page]);

  return (
    <ScrollView
      className="flex-1 bg-slate-50 mb-26"
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pt-4 pb-8">

        <PageTitle
          title="Mes services"
          subTitle="Gérez vos services ici. Ce que vous ajoutez sera affiché sur votre profil public."
        />

        {/* ADD BUTTON */}
        <View className="mt-6">
          <TouchableOpacity activeOpacity={0.8} className="bg-slate-900 rounded-2xl py-4 flex-row items-center justify-center gap-2">
            <Plus color="white" size={20} />

            <Text className="text-white font-semibold">
              Ajouter un service
            </Text>
          </TouchableOpacity>
        </View>

        {/* SERVICES */}
        <View className="mt-6 gap-4">

          {paginatedServices.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
            >

              <Image
                source={{ uri: item.image }}
                className="w-full h-48"
                resizeMode="cover"
              />

              <View className="p-5">

                <Text className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </Text>

                <Text className="text-slate-500 leading-6">
                  {item.description}
                      </Text>

                  <View className='flex-row items-center gap-x-2 mt-2'>
                          <TouchableOpacity
                              activeOpacity={0.8}
                              className='flex-1 flex-row items-center justify-center gap-2 bg-green-300 text-white h-12 rounded-xl'
                          >
                              <Pencil size={18} color='green' />
                              <Text className='font-medium capitalize text-lg text-green-800'>modifier</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              activeOpacity={0.8}
                              className='bg-red-400 h-12 w-12 items-center justify-center rounded-xl'
                          >
                              <Trash size={18} color='white' />
                          </TouchableOpacity>
                      </View>
                      
                  </View>
                  

            </View>
          ))}

        </View>

        {/* PAGINATION */}
        <View className="flex-row items-center justify-center gap-3 mt-6">

          <TouchableOpacity
            disabled={page === 1}
            onPress={() => setPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded-xl ${
              page === 1
                ? 'bg-slate-200'
                : 'bg-slate-900'
            }`}
          >
            <Text
              className={`font-medium ${
                page === 1
                  ? 'text-slate-400'
                  : 'text-white'
              }`}
            >
              Prev
            </Text>
          </TouchableOpacity>

          <View className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
            <Text className="font-semibold text-slate-800">
              {page} / {totalPages}
            </Text>
          </View>

          <TouchableOpacity
            disabled={page === totalPages}
            onPress={() => setPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-xl ${
              page === totalPages
                ? 'bg-slate-200'
                : 'bg-slate-900'
            }`}
          >
            <Text
              className={`font-medium ${
                page === totalPages
                  ? 'text-slate-400'
                  : 'text-white'
              }`}
            >
              Next
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </ScrollView>
  );
};

export default Services;

const styles = StyleSheet.create({});