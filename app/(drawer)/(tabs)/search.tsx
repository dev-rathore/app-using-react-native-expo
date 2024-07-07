import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { ThemedView } from '@/components/ThemedView';
import AppLayout from '@/components/app-layout/app-layout';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/text-input/text-input';
import { Colors } from '@/constants/Colors';

interface Pokemon {
  abilities: string[];
  height: number;
  image: string;
  name: string;
  type: string;
  url: string;
  weight: number;
}

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  return (
    <ThemedView
      darkColor={Colors.common.gray300}
      style={styles.card}
    >
      <Image
        source={{ uri: pokemon.image }}
        style={styles.cardImage}
      />
      <ThemedText style={styles.cardTitle} type='textLg' fontWeight='fontBold'>
        {pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}
      </ThemedText>
      <ThemedView
        darkColor={Colors.common.gray300}
        style={styles.cardRow}
      >
        <ThemedText fontWeight='fontMedium' style={styles.cardRowItem} type='textSm'>Type: </ThemedText>
        <ThemedText style={styles.cardRowItem} type='textSm'>{pokemon.type}</ThemedText>
      </ThemedView>
      <ThemedView
        darkColor={Colors.common.gray300}
        style={styles.cardRow}
      >
        <ThemedText fontWeight='fontMedium' style={styles.cardRowItem} type='textSm'>Weight: </ThemedText>
        <ThemedText style={styles.cardRowItem} type='textSm'>{pokemon.weight} lbs</ThemedText>
      </ThemedView>
      <ThemedView
        darkColor={Colors.common.gray300}
        style={styles.cardRow}
      >
        <ThemedText fontWeight='fontMedium' style={styles.cardRowItem} type='textSm'>Height: </ThemedText>
        <ThemedText style={styles.cardRowItem} type='textSm'>{pokemon.height * 10} cm</ThemedText>
      </ThemedView>
      <ThemedView
        darkColor={Colors.common.gray300}
        style={{
          flexDirection: 'row',
        }}
      >
        <ThemedText type='textSm'>
          <ThemedText fontWeight='fontMedium'>Abilities: </ThemedText>
          {pokemon.abilities.join(', ')}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

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
          const pokemonDetails = await axios.get(pokemon.url);

          return {
            abilities: pokemonDetails.data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),            
            height: pokemonDetails.data.height,
            image: pokemonDetails.data.sprites.other['official-artwork'].front_default,
            name: pokemon.name,
            type: pokemonDetails.data.types[0].type.name,
            url: pokemon.url,
            weight: pokemonDetails.data.weight,
          };
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
            const pokemonDetails = await axios.get(pokemon.url);
            return {
              abilities: pokemonDetails.data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
              height: pokemonDetails.data.height,
              image: pokemonDetails.data.sprites.other['official-artwork'].front_default,
              name: pokemon.name,
              type: pokemonDetails.data.types[0].type.name,
              url: pokemon.url,
              weight: pokemonDetails.data.weight,
            };
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
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            data={filteredData}
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
  card: {
    borderRadius: 25,
    elevation: 1,
    marginBottom: 10,
    padding: 16,
    width: '48%',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardRowItem: {
    flexDirection: 'row',
  },
  cardImage: {
    marginRight: 16,
    minHeight: 150,
    width: '100%',
  },
  cardTitle: {
    textAlign: 'center',
  },
});

export default TabTwoScreen;
