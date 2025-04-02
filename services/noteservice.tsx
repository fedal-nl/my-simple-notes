import databaseService from "./databaseservice";
import { config, ID, Query } from "./appwrite";

const noteService = {
    async getNotes(user_id: string) {
        if (!user_id) {
            return { error: 'User id is required' };
        }
        const response = await databaseService.listDocuments(config.db_id!, config.col.notes!, [Query.equal('user_id', [user_id])]);
        console.log('noteService listNotes', response);
        if (response.error) {
            console.error(response.error);
            return { error: response.error };
        }
        return { notes: response };
    },
    async createNote(noteText: string, user_id: string) {
        if (!noteText) {
            return { error: 'Note text is required' };
        }
        const noteData = {
            note: noteText,
            createdAt: new Date().toISOString(),
            user_id: user_id,
        }
        const id = ID.unique();
        console.log('noteService createNote', id, noteData);
        
        const response = await databaseService.createDocument(config.db_id!, config.col.notes!, noteData, id);
        console.log('noteService createNote', response);
        
        if (response.error) {
            console.error(response.error);
            return { error: response.error };
        }
        return { data: response };
    },

    updateNote: async (id: string, noteText: string) => {
        console.log('updateNote params received: ', id, noteText);
        if (!noteText) {
            return { error: 'Note text is required' };
        }
        const noteData = {
            note: noteText,
        }
        console.log('noteService updateNote', id, noteData);
        const response = await databaseService.updateDocument(config.db_id!, config.col.notes!, id, noteData);
        console.log('noteService updateNote', response);
        if (response.error) {
            console.error(response.error);
            return { error: response.error };
        }
        return { data: response };
    },

    async deleteNote(id: string) {
        const respoonse = await databaseService.deleteDocument(config.db_id!, config.col.notes!, id);
        console.log('noteService deleteNote', respoonse);
        if (respoonse.error) {
            console.error(respoonse.error);
            return { error: respoonse.error };
        }
        return { data: respoonse };
    }
}
export default noteService;