import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

export default function SearchBar({
  searchQuery,
  onSearchChange,
  showResults,
  searchResults,
  onSelectResult,
  onFocus,
  topOffset,
}) {
  return (
    <View style={{ ...styles.searchContainer, top: topOffset }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a location"
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={onSearchChange}
        onFocus={onFocus}
      />
      {showResults && searchResults.length > 0 && (
        <View style={styles.searchResults}>
          <ScrollView nestedScrollEnabled={true}>
            {searchResults.map((result, index) => (
              <TouchableOpacity
                key={index}
                style={styles.searchResultItem}
                onPress={() => onSelectResult(result)}
              >
                <Text style={styles.searchResultText}>
                  {result.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  searchInput: {
    backgroundColor: "#202023b7",
    borderRadius: 20,
    padding: 12,
    fontSize: 16,
    color: "white",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchResults: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 10,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1001,
  },
  searchResultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchResultText: {
    color: "#333",
    fontSize: 14,
  },
});
