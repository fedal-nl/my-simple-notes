import { account, ID } from "./appwrite";

const authService = {

    async createAccount( email: string, password: string) {
        try {
            const response = await account.create(ID.unique(), email, password);
            console.log('createAccount', response);
            return response;
        } catch (error) {
            console.error(error);
            return { error: error.message || 'Failed to create account' };
        }
    },

    async getCurrentUser() {
        try {
            const response = await account.get();
            console.log('getCurrentUser', response);
            return response;
        } catch (error) {
            const errMsg = `Failed to get current user': ${error.message}`;
            console.log(error);
            return { error: errMsg };
        }
    },

    async login(email: string, password: string) {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            console.log('AuthService: login', response);
            // if the response is success, fetch the user and don't get it from the response of the login because this will create a 
            // temporary session and the user object will not be complete
            const account_response = await account.get();
            console.log('AuthService: account_response', account_response);
            return account_response;
        } catch (error) {
            console.error(error);
            return { error: error.message || 'Failed to login' };
        }
    },


    async logout() {
        try {
            const response = await account.deleteSession('current');
            console.log('authService logout', response);
            return response;
        } catch (error) {
            console.log(error);
            return { error: `Failed to logout: ${error.message}` };
        }
    }
}

export default authService;