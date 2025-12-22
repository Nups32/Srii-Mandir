/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import CryptoJS from 'crypto-js';

interface AuthData {
  token: any | null;
  roleId: any | null;
  email: any | null;
  fullName: any | null;
}

export interface AuthContextProps {
  authData: AuthData;
  setAuthData: (data: AuthData) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextProps>({
  authData: { token: null, roleId: null, email: null, fullName: null },
  setAuthData: () => { },
});

const encryptionKey = 'my-secret-key@Intellect'; // Use a more secure key in a real application

const encryptData = (data: AuthData): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
};

const decryptData = (ciphertext: string): AuthData => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
      localStorage.removeItem('authData');
    throw new Error('Decryption failed or malformed data.');

  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authData, setAuthDataState] = useState<AuthData>(() => {
    const storedAuthData = localStorage.getItem('authData');
    return storedAuthData ? decryptData(storedAuthData) : { token: null, roleId: null, email: null, fullName: null };
  });

  const setAuthData = (data: AuthData) => {
    setAuthDataState(data);
    const encryptedData = encryptData(data);
    localStorage.setItem('authData', encryptedData);
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};  
