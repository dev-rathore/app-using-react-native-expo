import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ThemedView } from '@/components/ThemedView';
import AppLayout from '@/components/app-layout/app-layout';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import PokemonCard, { Pokemon } from '@/components/card/pokemon-card';
import { getPokemonDetails } from '@/services/pokemon-service';
import { useColorScheme } from '@/hooks/useColorScheme';

const InfiniteScrollScreen: React.FC = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const flatListRef = useRef<FlatList>(null);
  const colorScheme = useColorScheme();

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    try {
      const offset = (pageNumber - 1) * 10;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
      const results = await Promise.all(
        response.data.results.map(async (pokemon: { name: string; url: string }) => {
          return getPokemonDetails(pokemon);
        })
      );
      setData((prevData) => [...prevData, ...results]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <AppLayout>
      <ThemedView style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          data={data}
          keyExtractor={(item, i) => i.toString()}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color={Colors[colorScheme].tint} /> : null}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ref={flatListRef}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
          <Ionicons
            name="arrow-up"
            size={24}
            color={'white'}
          />
        </TouchableOpacity>
      </ThemedView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 0 : 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  scrollToTopButton: {
    alignItems: 'center',
    backgroundColor: Colors.common.green,
    borderRadius: 25,
    bottom: 20,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 50,
  },
});

export default InfiniteScrollScreen;
