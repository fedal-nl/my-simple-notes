import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect} from 'react'

import NoteList from '@/components/NoteList';
import AddNoteModal from '@/components/AddNoteModal';
import noteService from '@/services/noteservice';

import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';


const NoteScreen = () => {
    const router = useRouter();
    const { user, loading:authLoading } = useAuth();

    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newNote, setNewNote ] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user && !authLoading) {
            router.replace("/auth");
        }
    }, [user, authLoading]);

    useEffect(() => {
        if (user) {
            console.log('User loggedIn with ', user.$id);
            fetchNotes();
        }
    }, [user]);
    
    const deleteNote = async (id: string) => {
        console.log('deleteNote id received', id);
        Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { 
                text: "OK", 
                style: 'destructive', 
                onPress: async () => {
                    const response = await noteService.deleteNote(id);
                    if (response.error) {
                        Alert.alert("Error: Failed to delete note: ", response.error);
                    } else {
                        const newNotes = notes.filter((note) => note.$id !== id);
                        setNotes(newNotes);
                    }
                } 
            }
        ]);
    }

    const updateNote = async (id: string, text: string) => {
        console.log('updateNote id and text received', id, text);
        const response = await noteService.updateNote(id, text);
        if (response.error) {
            Alert.alert("Error: Failed to update note: ", response.error);
        } else {
            const updatedNotes = notes.map((note) => {
                if (note.$id === id) {
                    return { ...note, note: text };
                } else {
                    return note;
                }
            });
            setNotes(updatedNotes);
        }
    }

    const fetchNotes = async () => {
        setLoading(true);
        const response = await noteService.getNotes(user.$id);
        if (response.error) {
            setError(response.error);
            Alert.alert("Error: Failed to fetch notes: ", response.error);
        } else {
            setNotes(response.notes);
            setError(null);
        }
        setLoading(false);
    };
    
    const addNote = async () => {
        const response = await noteService.createNote(newNote, user.$id);
        // setNotes([...notes, { id: String(notes.length + 1), text: newNote }]);
        if (response.error) {
            Alert.alert("Error: Failed to add note: ", response.error);
            console.log('Error: Failed to add note: ', response.error);
        } else {
            console.log('addNote response', response);
            setNotes([...notes, response.data]);

        }
        setShowModal(false);
        setNewNote("");
    }
    console.log('notes', notes);

  return (
    <View style={styles.container}>
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ): <>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <NoteList notes={notes} onDelete={deleteNote} onUpdate={updateNote}/>
           </>
        }
        
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowModal(true)}
          >
            <Text style={{color: "#fff"}}>Add note</Text>
        </TouchableOpacity>
        <AddNoteModal
            showModal={showModal}
            setShowModal={setShowModal}
            newNote={newNote}
            setNewNote={setNewNote}
            addNote={addNote}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        // alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
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
    errorText: {
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
    }
})

export default NoteScreen