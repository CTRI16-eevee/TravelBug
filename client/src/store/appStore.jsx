import {create} from 'zustand';


const useAppStore = create((set) => ({
    username: '',
    avatar: '',
    id: '',
    isLoggedIn: false,
    logInUser: (username, avatar, id, userData) =>
      set(() => ({
        username: username,
        avatar: avatar,
        id: id,
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
  