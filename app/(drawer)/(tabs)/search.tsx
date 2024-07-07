import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { ThemedView } from '@/components/ThemedView';
import AppLayout from '@/components/app-layout/app-layout';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/text-input/text-input';
import PokemonCard, { Pokemon } from '@/components/card/pokemon-card';
import { getPokemonDetails } from '@/services/pokemon-service';

const TabTwoScreen: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<Pokemon[]>([]);
  const [filteredData, setFilteredData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      const results = await Promise.all(
        response.data.results.map(async (pokemon: {
          name: string;
          url: string,
        }) => {
          return getPokemonDetails(pokemon);
        })
      );
      setData(results);
      setFilteredData(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredData = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      const results = await Promise.all(
        response.data.results
          .filter((pokemon: { name: string; url: string }) => pokemon.name.includes(query.toLowerCase()))
          .slice(0, 20)
          .map(async (pokemon: { name: string; url: string }) => {
            return getPokemonDetails(pokemon);
          })
      );
      setFilteredData(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleInputChange = useCallback(
    debounce((input: string) => {
      if (input) {
        fetchFilteredData(input);
      } else {
        setFilteredData(data);
      }
    }, 300),
    [data]
  );

  const onInputChange = (text: string) => {
    setQuery(text);
    handleInputChange(text);
  };

  return (
    <AppLayout>
      <ThemedView style={styles.container}>
        <ThemedText type='textXl' fontWeight='fontBold' style={{marginBottom: 16}}>Filter Search</ThemedText>
        <ThemedTextInput
          value={query}
          onChangeText={onInputChange}
          placeholder="Search Pokémon..."
        />
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <FlatList
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            data={filteredData}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            keyExtractor={(item) => item.name}
            numColumns={2}
            renderItem={({ item }) => <PokemonCard pokemon={item} />}
          />
        )}
      </ThemedView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {},
});

export default TabTwoScreen;
