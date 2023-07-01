import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";

const AddCarbsModal = ({ visible, onDismiss, onSave }) => {
  const [carbs, setCarbs] = useState("");

  const handleSave = () => {
    onSave(carbs);
    setCarbs("");
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <TextInput
            label="Carbs"
            value={carbs}
            onChangeText={(text) => setCarbs(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
          >
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    marginBottom: 16,
    width: "100%",
  },
  saveButton: {
    width: "100%",
  },
});

export default AddCarbsModal;
