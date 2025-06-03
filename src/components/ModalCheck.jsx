import react, { useState } from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import {BlurView} from 'expo-blur'

const ModalCheck = ({ total, modalVisible, setModalVisible, clearCart }) => {

    const [successModal, setSuccessModal] = useState(false)
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
            <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />

          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Confirmas la compra por $ {total.toFixed(2)} ?
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                clearCart();
                setTimeout(() => {
    setSuccessModal(true); // Mostrás el modal de éxito después de un breve delay
  }, 300);
              }}
            >
              <Text style={styles.textStyle}>Confirmar</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalCheck;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    zIndex:1,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
