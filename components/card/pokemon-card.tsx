import { Image, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Colors } from "@/constants/Colors";

export interface Pokemon {
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

export default PokemonCard;

const styles = StyleSheet.create({
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
