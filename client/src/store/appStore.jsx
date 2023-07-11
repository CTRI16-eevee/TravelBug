import {create} from 'zustand';


const useAppStore = create((set) => ({
    username: '',
    secret: '',
    isLoggedIn: false,
    logInUser: (username, secret, userData) =>
      set(() => ({
        username: username,
        secret: secret,
        isLoggedIn: true,
        userData: userData,
      })),
    logOutUser: () =>
      set(() => ({
        username: '',
        secret: '',
        isLoggedIn: false,
        userData: {
          decryption: 'isValid',
          dbs: [],
        },
      })),
    userData: {
      decryption: 'isValid',
      dbs: [],
    },
    updateUserData: (userData) =>
      set(() => ({
        userData: userData,
      })),
  }));
  
  export default useAppStore;
  