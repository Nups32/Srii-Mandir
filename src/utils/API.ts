/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
// import { message } from 'antd';
import axios from "axios";
// import CryptoJS from "crypto-js";
// import { constants } from 'fs/promises';

export const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const CommanAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_AUTH_URL,
});

CommanAPI.interceptors.request.use(async (config) => {
  // const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;
  // const now = new Date();
  // const res = await axios.get(`${import.meta.env.VITE_BACKEND_AUTH_URL}server-time`);
  // const now = new Date(res.data.serverTime);
  // const personalKey = `myWifi@Token_secretPWD ${String(
  //   now.getUTCDate()
  // ).padStart(2, "0")}-${String(now.getUTCMonth() + 1).padStart(
  //   2,
  //   "0"
  // )}-${String(now.getUTCFullYear()).slice(-2)}-${String(
  //   now.getUTCHours()
  // ).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}`;
  // const encryptedKey = CryptoJS.AES.encrypt(
  //   // JSON.stringify(personalKey),
  //   personalKey,
  //   encryptionKey
  // ).toString();
  // if (encryptedKey) {
  //   config.headers["x-personal-key"] = encryptedKey;
  // }
  return config;
});

API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  // const wifiKey = localStorage.getItem("wifiKey");
  // const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;
  // // const now = new Date();
  // const res = await axios.get(`${import.meta.env.VITE_BACKEND_AUTH_URL}server-time`);
  // const now = new Date(res.data.serverTime);
  // const personalKey = `myWifi@Token_secretPWD ${String(
  //   now.getUTCDate()
  // ).padStart(2, "0")}-${String(now.getUTCMonth() + 1).padStart(
  //   2,
  //   "0"
  // )}-${String(now.getUTCFullYear()).slice(-2)}-${String(
  //   now.getUTCHours()
  // ).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(
  //   2,
  //   "0"
  // )}===${wifiKey}`;
  // const encryptedKey = CryptoJS.AES.encrypt(
  //   // JSON.stringify(personalKey),
  //   personalKey,
  //   encryptionKey
  // ).toString();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // if (encryptedKey) {
  //   config.headers["x-personal-key"] = encryptedKey;
  // }
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Check for invalid token response
      if (error.response.status === 401) {
        // message.error('Invalid token. Please login again.');
        localStorage.removeItem("token");
        window.location.href = "admin-login"; // Adjust the redirect URL as needed
      }
    }
    return Promise.reject(error);
  }
);

export const contactUs = async (data: any) => {
  try {
    const response = await CommanAPI.post("/contact", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPooja = async () => {
  try {
    const response = await CommanAPI.get("/pooja");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPoojaBySlug = async (slug: string) => {
  try {
    const response = await CommanAPI.get(`/pooja/${slug}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPoojaById = async (id: string) => {
  try {
    const response = await API.get(`/backend/pooja/${id}/edit`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const storePooja = async (data: any) => {
  try {
    const response = await API.post("/backend/pooja", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePooja = async (id: string, data: any) => {
  try {
    const response = await API.put(`/backend/pooja/${id}/update`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// Media API functions
export const getMedias = async () => {
  const response = await CommanAPI.get(`/media`);
  return response;
};

export const getAllMedia = async () => {
  const response = await API.get(`/backend/media/get-all`);
  return response;
};

export const getMediaById = async (id: string) => {
  const response = await API.get(`/backend/media/${id}/edit`);
  return response;
};

export const storeMedia = async (formData: FormData) => {
  const response = await API.post(`/backend/media`, formData);
  return response;
};

export const updateMedia = async (id: string, formData: FormData) => {
  const response = await API.put(`/backend/media/${id}/update`, formData);
  return response;
};

export const deleteMedia = async (id: string) => {
  const response = await API.delete(`/backend/media/${id}/delete`);
  return response;
};

export const updateMediaStatus = async (id: string, data: { isActive?: boolean; isPaid?: boolean }) => {
  const response = await API.patch(`/backend/media/${id}/status`, data);
  return response;
};

// Chadhava API functions
export const getChadhava = async () => {
  const response = await CommanAPI.get(`/chadhava`);
  return response;
};

export const getAllChadhava = async () => {
  const response = await API.get(`/backend/chadhava/get-all`);
  return response;
};

export const getChadhavaById = async (id: string) => {
  const response = await API.get(`/backend/chadhava/${id}/edit`);
  return response;
};

export const storeChadhava = async (formData: FormData) => {
  const response = await API.post(`/backend/chadhava`, formData);
  return response;
};

export const updateChadhava = async (id: string, formData: FormData) => {
  const response = await API.put(`/backend/chadhava/${id}/update`, formData);
  return response;
};

export const deleteChadhava = async (id: string) => {
  const response = await API.delete(`/backend/chadhava/${id}/delete`);
  return response;
};

export const updateChadhavaStatus = async (id: string, data: { isActive?: boolean; isPaid?: boolean }) => {
  const response = await API.patch(`/backend/chadhava/${id}/status`, data);
  return response;
};


// export const getChadhava = async () => {
//   try {
//     const response = await CommanAPI.get("/chadhava");
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const storeChadhava = async (data: any) => {
//   try {
//     const response = await API.post("/backend/chadhava/store", data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };


export const getPoojaPackage = async () => {
  try {
    const response = await CommanAPI.get("/pooja-package");
    return response;
  } catch (error) {
    throw error;
  }
};

export const storePoojaPackage = async (data: any) => {
  try {
    const response = await API.post("/backend/pooja-package/store", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteContact = async (id: any) => {
  try {
    const response = await API.delete(`/contact/${id}/delete`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (data: any) => {
  try {
    const response = await API.get("/backend/users/get", { params: data });
    return response;
  } catch (error) {
    throw error;
  }
};

export const editUserData = async (id: any) => {
  try {
    const response = await API.get(`/backend/user/${id}/edit`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async (id: any, updateUserData: any): Promise<any> => {
  try {
    const response = await API.put(`/backend/user/${id}/update`, updateUserData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUserData = async (id: any) => {
  try {
    const response = await API.delete(`/backend/user/${id}/delete`);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const login = async (data: any) => {
//   try {
//     const response = await CommanAPI.post("/login", data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const dynamicLogin = async (api: string, data: any) => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    if (!response.data || !response.data.ip) {
      throw new Error("Failed to fetch public IP");
    } else {
      const role = api === "/admin-login" ? 1 : 2;
      const login = await CommanAPI.post(api, {
        ...data,
        ip: response.data.ip,
        role,
      });
      return login;
    }
  } catch (error) {
    throw error;
  }
};

export const createWhitelistip = async (data: any) => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    if (!response.data || !response.data.ip) {
      throw new Error("Failed to fetch public IP");
    } else {
      const whitelistip = await CommanAPI.post("/create-whitelist-ip", {
        ...data,
        ip: response.data.ip,
      });
      return whitelistip;
    }
  } catch (error) {
    throw error;
  }
};



export const getSettingsData = async () => {
  try {
    const response = await CommanAPI.get("setting");
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateSettigsData = async (formData: any): Promise<any> => {
  try {
    const response = await API.put("admin/setting/update", formData);

    return response;
  } catch (error) {
    throw error;
  }
};
