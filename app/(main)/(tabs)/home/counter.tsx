import { Stack } from "expo-router";
import { useState } from "react";
import { Button } from "react-native";

import AppLayout from "@/components/app-layout/app-layout";

const CounterScreen = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    setCount(count - 1);
  }

  return (
    <AppLayout>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          title: `Counter Screen - ${count}`,
        }}
      />
      <Button
        title="Increase count"
        onPress={increment}
      />
      <Button
        title="Decrease count"
        onPress={decrement}
      />
    </AppLayout>
  );
};

export default CounterScreen;
