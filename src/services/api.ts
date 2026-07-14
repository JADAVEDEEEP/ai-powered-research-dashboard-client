import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://ai-research-dashboard-server.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 120000,
});

// POST /api/research
export const researchCompany = async (companyName: string) => {
  const { data } = await api.post("/research", { companyName });
  return data;
};

// GET /api/history
export const getHistory = async () => {
  const { data } = await api.get("/history");
  return data;
};

// DELETE /api/history/:id
export const deleteHistory = async (id: string) => {
  const { data } = await api.delete(`/history/${id}`);
  return data;
};

export default api;
