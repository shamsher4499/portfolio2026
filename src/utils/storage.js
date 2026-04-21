import { encryptData, decryptData } from "./auth";
import { defaultData } from "../data/portfolioData";

const STORAGE_KEY = "portfolio_data_v2";

const normalizePortfolioData = (stored) => {
  if (!stored || typeof stored !== "object") return defaultData;

  return {
    ...defaultData,
    ...stored,
    hero: { ...defaultData.hero, ...(stored.hero || {}) },
    contact: { ...defaultData.contact, ...(stored.contact || {}) },
    skills: Array.isArray(stored.skills) && stored.skills.length ? stored.skills : defaultData.skills,
    experience: Array.isArray(stored.experience) && stored.experience.length ? stored.experience : defaultData.experience,
    projects: Array.isArray(stored.projects) && stored.projects.length ? stored.projects : defaultData.projects,
  };
};

export const savePortfolioData = (data) => {
  const encrypted = encryptData(data);
  localStorage.setItem(STORAGE_KEY, encrypted);
};

export const loadPortfolioData = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultData;
  const decrypted = decryptData(raw);
  return normalizePortfolioData(decrypted);
};

export const updateSection = (section, value) => {
  const data = loadPortfolioData();
  data[section] = value;
  savePortfolioData(data);
  return data;
};
