import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import Svg, { Path } from "react-native-svg";
import { categories } from "../../data/categories";
import CategoryTab from "./CategoryTab";

export default function TopNavBar({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            style={styles.searchIcon}
          >
            <Path
              d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <TextInput
            style={styles.input}
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="Search for products..."
            placeholderTextColor="#999"
            returnKeyType="search"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
          style={styles.categoriesContainer}
        >
          {categories.map((cat, index) => (
            <CategoryTab
              key={cat.id}
              cat={cat}
              index={index}
              isActive={category === cat.id}
              onPress={() => {
                setSearchQuery("");
                setCategory(cat.id);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#201f26",
    zIndex: 10,
    paddingTop: 10,
    elevation: 5,
    margin: 0,
  },
  content: {
    width: "100%",
    gap: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b1b20",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#3e3e4a",
    marginBottom: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "white",
  },
  categoriesContainer: {
    flexGrow: 0,
  },
  categoriesScroll: {
    gap: 24,
  },
});
