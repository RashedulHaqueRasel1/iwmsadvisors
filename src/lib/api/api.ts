import axios from "axios";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
};

export const url = getBaseUrl();

export async function getServices() {
  try {
    const data = await axios.get(`${url}/service-page`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch services");
  }
}

export async function getServicePageTitle() {
  try {
    const data = await axios.get(`${url}/service-page-title`);
    return data.data;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Failed to fetch service page titles",
    );
  }
}
export async function getSingleServices(id: string) {
  try {
    const data = await axios.get(`${url}/service-page/${id}`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch services");
  }
}

export async function getRealEstate() {
  try {
    const data = await axios.get(`${url}/real-state`);
    return data.data;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Failed to fetch real estate facilities",
    );
  }
}

export async function getSingleRealEstate(id: string) {
  try {
    const data = await axios.get(`${url}/real-state/${id}`);
    return data.data;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Failed to fetch single real estate",
    );
  }
}

export async function getBlogs(page: number = 1, limit: number = 8) {
  try {
    const data = await axios.get(`${url}/blog?page=${page}&limit=${limit}`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch blogs");
  }
}
export async function getSingleBlog(id: string) {
  try {
    const data = await axios.get(`${url}/blog/${id}`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch single blog");
  }
}

// case CaseStudyCard

export async function getCaseStudies() {
  try {
    const data = await axios.get(`${url}/case-study`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch case studies");
  }
}
export async function getSingleCaseStudy(id: string) {
  try {
    const data = await axios.get(`${url}/case-study/${id}`);
    return data.data;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Failed to fetch single case study",
    );
  }
}

export async function postContact(formData: FormData) {
  try {
    const data = await axios.post(`${url}/contact`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to send message");
  }
}

// Career Endpoints
export async function getCareers() {
  try {
    const data = await axios.get(`${url}/career`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch careers");
  }
}

export async function getSingleCareer(id: string) {
  try {
    const data = await axios.get(`${url}/career/${id}`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch career");
  }
}

export async function postCareerApplication(formData: FormData, id: string) {
  try {
    const data = await axios.post(`${url}/career/${id}/apply`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to submit application");
  }
}

export async function postApplication(formData: FormData) {
  try {
    const data = await axios.post(`${url}/application/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to submit application");
  }
}

// FAQ Endpoints
export async function getFAQs() {
  try {
    const data = await axios.get(`${url}/faq`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQs");
  }
}

export async function getSingleFAQ(id: string) {
  try {
    const data = await axios.get(`${url}/faq/${id}`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch FAQ");
  }
}

// Broadcast Subscribe
export async function postBroadcastSubscribe(email: string) {
  try {
    const data = await axios.post(`${url}/broadcast/subscribe`, { email });
    return data.data;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Failed to subscribe. Please try again.",
    );
  }
}

// Insight Endpoints
export async function getInsights() {
  try {
    const data = await axios.get(`${url}/insight/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch insights");
  }
}

// Service Title Endpoints
export async function getServiceTitles() {
  try {
    const data = await axios.get(`${url}/service/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch service titles");
  }
}

// Subscriber Title Endpoints
export async function getSubscriberTitles() {
  try {
    const data = await axios.get(`${url}/subscriber/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch subscriber titles");
  }
}

// Career Title Endpoints
export async function getCareerTitles() {
  try {
    const data = await axios.get(`${url}/career-title/all`);
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Failed to fetch career titles");
  }
}
