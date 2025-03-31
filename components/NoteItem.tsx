import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useRef} from 'react'

interface NoteProps {    
    text: string;
    id: string;
    onDelete: (id: string) => void;
    onUpdate: (id: string, text: string) => void;
}


const NoteItem = ({ text, id, onDelete, onUpdate } : NoteProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);
    const inputRef = useRef(null);

    const handleSave = () => {
        if (newText.trim().length === 0) {
            setNewText(newText);
            return;
        }
        console.log('text received => ', newText);
        onUpdate(id, newText);
    }
    
  return (
    <View style={styles.noteItem}>
        {isEditing ? (
            <TextInput
                ref={inputRef}
                value={newText}
                onChangeText={(text) => setNewText(text)}
                onBlur={() => {
                    setIsEditing(false);
                    handleSave();
                }}
                autoFocus
            />
        ) : (
            <Text style={styles.noteText}>{text}</Text>
        )}
        <View style={styles.viewActions}>
            {isEditing ? (
                <TouchableOpacity onPress={
                    () => {
                        handleSave();
                        inputRef.current?.blur();
                    }
                }><Text style={{color: "#ff8c00"}}>Save</Text>
                </TouchableOpacity>
            ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text style={{color: "blue", fontSize: 18}}>Edit</Text>
            </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => onDelete(id)}>
                <Text style={{color: "red", fontSize: 18}}>Delete</Text>
            </TouchableOpacity>

        </View>
  </View>
  )
}

const styles = StyleSheet.create({
    noteItem: {
        flexDirection: "row",
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
        justifyContent: "space-between",
    },
    noteText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    viewActions: {
        flexDirection: "row",
        gap: 20,

    },
})

export default NoteItem