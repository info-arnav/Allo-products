import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";

export default function AddressForm({
  address,
  houseNumber,
  setHouseNumber,
  floor,
  setFloor,
  landmark,
  setLandmark,
  focusedInput,
  setFocusedInput,
  houseNumberLabelAnim,
  floorLabelAnim,
  landmarkLabelAnim,
  houseNumberInputRef,
  showValidationError,
  isSaving,
  saveError,
  onSave,
  onChangeAddress,
}) {
  return (
    <View style={styles.formContainer}>
      <View style={styles.expandedHeader}>
        <Text style={styles.expandedTitle}>Add more address details</Text>
      </View>

      <ScrollView
        style={styles.formScrollView}
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <Animated.Text
              style={[
                styles.inputLabel,
                {
                  opacity: houseNumberLabelAnim,
                  transform: [
                    {
                      translateY: houseNumberLabelAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              Flat / House no / Building name *
            </Animated.Text>
            <TextInput
              ref={houseNumberInputRef}
              style={[
                styles.inputLarge,
                showValidationError && !houseNumber.trim() && styles.inputError,
              ]}
              placeholder="Flat / House no / Building name *"
              placeholderTextColor="#666"
              value={houseNumber}
              onChangeText={setHouseNumber}
              onFocus={() => setFocusedInput("houseNumber")}
              onBlur={() => setFocusedInput(null)}
              multiline
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <Animated.Text
              style={[
                styles.inputLabel,
                {
                  opacity: floorLabelAnim,
                  transform: [
                    {
                      translateY: floorLabelAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              Floor (optional)
            </Animated.Text>
            <TextInput
              style={styles.input}
              placeholder="Floor (optional)"
              placeholderTextColor="#666"
              value={floor}
              onChangeText={setFloor}
              onFocus={() => setFocusedInput("floor")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <View style={styles.addressBoxContainer}>
              <View style={styles.addressBox}>
                <Text style={styles.addressBoxText}>
                  {address.street ? address.street + ", " : ""}
                  {address.city ? address.city + ", " : ""}
                  {address.region ? address.region + ", " : ""}
                  {address.postalCode ? address.postalCode : ""}
                </Text>
                <TouchableOpacity onPress={onChangeAddress}>
                  <Text style={styles.changeButton}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <Animated.Text
              style={[
                styles.inputLabel,
                {
                  opacity: landmarkLabelAnim,
                  transform: [
                    {
                      translateY: landmarkLabelAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              Nearby landmark (optional)
            </Animated.Text>
            <TextInput
              style={styles.inputLarge}
              placeholder="Nearby landmark (optional)"
              placeholderTextColor="#666"
              value={landmark}
              onChangeText={setLandmark}
              onFocus={() => setFocusedInput("landmark")}
              onBlur={() => setFocusedInput(null)}
              multiline
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        {saveError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{saveError}</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={onSave}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? "Saving..." : "Save Address"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  formScrollView: {
    flex: 1,
  },
  formContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  expandedHeader: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    marginBottom: 24,
  },
  expandedTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    position: "relative",
  },
  inputLabel: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "#202023",
    paddingHorizontal: 6,
    color: "#fff",
    fontSize: 12,
    zIndex: 1,
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    minHeight: 50,
  },
  inputLarge: {
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    minHeight: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#ff5252",
    borderWidth: 2,
  },
  addressBoxContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  addressBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    minHeight: 50,
  },
  addressBoxText: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
  },
  changeButton: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#46464e",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#666",
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    backgroundColor: "#ff525220",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ff5252",
  },
  errorText: {
    color: "#ff5252",
    fontSize: 14,
    textAlign: "center",
  },
});
