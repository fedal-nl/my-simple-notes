import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native'
import React from 'react'

const AddNoteModal = ({
    showModal, setShowModal, newNote, setNewNote, addNote
}: any ) => {
  return (

    <Modal visible={showModal} animationType="slide" transparent onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add a note</Text>
                <TextInput
                    style={styles.noteInput}
                    placeholder="Enter your note"
                    placeholderTextColor={"#aaa"}
                    value={newNote}
                    onChangeText={(text) => setNewNote(text)}
                />
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity
                        style={[styles.addButton, {backgroundColor: "#aaa"}]}
                        onPress={() => setShowModal(false)}
                    >
                        <Text style={{color: "#fff"}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {addNote()
                        }}
                    >
                        <Text style={{color: "#fff"}}>Add note</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: "#ff8c00",
        padding: 10,
        borderRadius: 10,
        color: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    noteInput: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
})

export default AddNoteModal