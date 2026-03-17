import axios from "axios";
import { url } from "./api";

export async function getBanners() {
  try {
    const data = await axios.get(`${url}/banner/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

export async function getAbout() {
  try {
    const data = await axios.get(`${url}/about/get`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

export async function getFooter() {
  try {
    const data = await axios.get(`${url}/footer/get`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

export async function getFeatures() {
  try {
    const data = await axios.get(`${url}/features/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

export async function getMission() {
  try {
    const data = await axios.get(`${url}/mission/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

export async function getVision() {
  try {
    const data = await axios.get(`${url}/vision/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

export async function getCertifications() {
  try {
    const data = await axios.get(`${url}/certifications/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

export async function getExpertise() {
  try {
    const data = await axios.get(`${url}/expertise/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

// services here
export async function getHero() {
  try {
    const data = await axios.get(`${url}/hero/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

// translation
export async function getTranslations() {
  try {
    const data = await axios.get(`${url}/transform/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

//number
export async function getNumbers() {
  try {
    const data = await axios.get(`${url}/number/get`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}
export async function getContactInformation() {
  try {
    const data = await axios.get(`${url}/information/get`);
    return data.data;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Failed to fetch Contact Information",
    );
  }
}

export async function getConsultants() {
  try {
    const data = await axios.get(`${url}/consultant/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch Consultants");
  }
}

export async function getStrengths() {
  try {
    const data = await axios.get(`${url}/strength/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch Strengths");
  }
}

export async function getItems() {
  try {
    const data = await axios.get(`${url}/items/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch Items");
  }
}

export async function getNavbar() {
  try {
    const data = await axios.get(`${url}/navbar/get`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch Navbar");
  }
}

export async function getStats() {
  try {
    const data = await axios.get(`${url}/stats/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch Stats");
  }
}
