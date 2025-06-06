import react from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import {selectTotalQuantity} from "../features/cart/cartSlice";
import Foundation from "@expo/vector-icons/Foundation";
import { COLORS } from "../constants/colors";

const CartTabIcon = ({ focused }) => {
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <View>
      <Foundation
        name="shopping-cart"
        size={32}
        color={focused ? COLORS.azul : COLORS.blanco}
      />
      {totalQuantity > 0 && (
        <View
          style={{
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: "red",
            borderRadius: 10,
            width: 18,
            height: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            {totalQuantity}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CartTabIcon
