import React from "react";
import { Stack } from "expo-router";
import { CartProvider } from "./Cart/cartTemp"; 

function Layout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* layout for all screens */}
      </Stack>
    </CartProvider>
  );
}

export default Layout;