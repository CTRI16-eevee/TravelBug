import {create} from 'zustand';


const useAppStore = create((set) => ({
    username: '',
    secret: '',
    avatar: '',
    isLoggedIn: false,
    logInUser: (username, secret, avatar, userData) =>
      set(() => ({
        username: username,
        secret: secret,
        avatar: avatar,
        isLoggedIn: true,
        userData: userData,
      })),
    logOutUser: () =>
      set(() => ({
        username: '',
        secret: '',
        avatar: '',
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
  