import { View,Text,FlatList,StyleSheet,Pressable,Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetCategoriesQuery } from "../service/shopService";
import { COLORS } from "../constants/colors";


export default function InfoScreeen({ navigation }) {
  const { data: categories, error, loading } = useGetCategoriesQuery();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItems}>
            <Pressable
              style={styles.pressable}
              onPress={() =>
                navigation.navigate("productos", {
                  categoriaId: item.id,
                  nombre: item.nombre,
                  imagen: item.imagen,
                })
              }
            >
              <Text style={styles.categoryText}>{item.nombre}</Text>
              <Image
                source={{ uri: item.imagen }}
                style={styles.image}
                resizeMode="container" //ajuste para que la imagen se vea bien
              />
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: COLORS.gris,
  },

  pressable: {
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: COLORS.negro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    marginVertical: 8,
  },
  categoryText: {
    fontSize: 25,

    marginBottom: 8,
    marginTop: 18,
    textAlign: "center",
    padding: 10,
    fontFamily:'gentiumPlus'
  },
  categoryItems: {
    width: "100%",
    padding: 3,
    margin: 5,
    borderRadius: 15,
  },
  image: {
    width: 340,
    height: 150,
    marginBottom: 1,
    borderRadius: 15,
  },
});
