import { View, FlatList } from 'react-native'
import React from 'react'
import NoteItem from './NoteItem'

interface Note {
    $id: string;
    note: string;
}

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const NoteList = ({ notes, onDelete, onUpdate }: NoteListProps ) => {
    console.log('notes received to the Flatlist => ', notes);
  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <NoteItem 
                text={item.note} 
                id={item.$id} 
                onDelete={onDelete}
                onUpdate={onUpdate} />
        )}
        />
    </View>
  )
}

export default NoteList