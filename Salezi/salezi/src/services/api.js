const API_URL = "http://192.168.1.43:1337/api";
const API_TOKEN = "568133dda4134ccc09de29e4a395be3ebf24eba99825a5520f458962e3be5d16d77f41be659864c0104ae4544bcb164701dfed03a1b2a28145c2dda364f52523cda9a2395d94dc6b177aafe7db52fb4a755b9943ae0dcf88e3ac5a7b418b5cd6395059aed562fcbb7cbd2bfded180ee31371f67f8bcfe27e4b2f31459b8fea5a"; // Insérez le token généré dans Strapi
 
export const fetchApi = async (endpoint, method = "GET", body = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
 
  if (body) {
    options.body = JSON.stringify(body);
  }
 
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur dans fetchApi : ${error.message}`);
    throw error;
  }
};