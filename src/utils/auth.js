import CryptoJS from "crypto-js";

const SECRET_KEY = "p0rtf0l10-$3cr3t-k3y-2026-ultra-secure";
const AUTH_KEY = "portfolio_auth_token";

const getAdminCredentials = () => {
  const adminUser = import.meta.env.VITE_ADMIN_USERNAME?.trim();
  const adminPass = import.meta.env.VITE_ADMIN_PASSWORD?.trim();
  return {
    adminUser,
    adminPass,
    configured: Boolean(adminUser && adminPass),
  };
};

export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
};

export const login = (username, password) => {
  const { adminUser, adminPass, configured } = getAdminCredentials();
  if (!configured) {
    return false;
  }

  const usernameHash = CryptoJS.SHA256(username).toString();
  const passwordHash = CryptoJS.SHA256(password).toString();
  const adminHash = CryptoJS.SHA256(adminUser).toString();
  const passHash = CryptoJS.SHA256(adminPass).toString();

  if (usernameHash === adminHash && passwordHash === passHash) {
    const token = encryptData({
      user: username,
      exp: Date.now() + 24 * 60 * 60 * 1000,
      role: "admin",
    });
    localStorage.setItem(AUTH_KEY, token);
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(AUTH_KEY);
  if (!token) return false;
  const data = decryptData(token);
  if (!data) return false;
  if (Date.now() > data.exp) {
    logout();
    return false;
  }
  return true;
};
