import { View } from 'react-native';
import React, { useMemo, useState } from 'react';
import ListingsBottomSheet from '@/screens/explore/ListingsBottomSheet';
import listingsData from '@/assets/data/airbnb-listings.json';
import ListingsMap from '@/screens/explore/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ExploreHeader from '@/screens/explore/ExploreHeader';
import AppLayout from '@/components/app-layout/app-layout';

const Explore = () => {
  const items = useMemo(() => listingsData as any, []);
  const getoItems = useMemo(() => listingsDataGeo, []);
  const [category, setCategory] = useState<string>('Tiny homes');

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <AppLayout>
      <ExploreHeader onCategoryChanged={onDataChanged} />
      <View style={{
        flex: 1,
      }}>
        <ListingsMap listings={getoItems} />
        <ListingsBottomSheet listings={items} category={category} />
      </View>
    </AppLayout>
  );
};

export default Explore;
