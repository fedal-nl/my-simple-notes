import { database } from './appwrite';

const databaseService = {
    async listDocuments(dbId: string, colId: string, queries = []) {
        console.log('databaseservice => listDocuments', dbId, colId, queries);
        try {
            const response = await database.listDocuments(dbId, colId, queries);
            console.log('listDocuments', response);
            return response.documents || [];
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    },
    async createDocument(dbId: string, colId: string, data: any, id: any) {
        console.log('createDocument', dbId, colId, data);
        try {
            const response = await database.createDocument(dbId, colId, id, data);
            console.log('createDocument', response);
            return response;
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    },

    updateDocument: async (dbId: string, colId: string, id: string, data: any) => {
        console.log('updateDocument params received: ', dbId, colId, id, data);
        try {
            const response = await database.updateDocument(dbId, colId, id, data);
            console.log('updateDocument', response);
            return response;
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    },

    async deleteDocument(dbId: string, colId: string, id: string) {
        try {
            const response = await database.deleteDocument(dbId, colId, id);
            console.log('deleteDocument', response);
            return response;
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    }
}


export default databaseService;

