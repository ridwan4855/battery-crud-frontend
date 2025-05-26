import { Battery } from "../types/battery";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://battery-crud-backend-git-main-ridwan4855s-projects.vercel.app";

export const batteryAPI = {
  async handleResponse(response: Response) {
    if (response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      throw new Error("Session expired");
    }
    return response.json();
  },

  async login(credentials: { username: string; password: string }) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return this.handleResponse(response);
  },
  async getToken(): Promise<string> {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No authentication token found");
    return token;
  },
  async getAll() {
    const response = await fetch(`${API_URL}/batteries`, {
      headers: {
        Authorization: await this.getToken(),
      },
    });
    return this.handleResponse(response);
  },

  async create(battery: Omit<Battery, "id">) {
    const response = await fetch(`${API_URL}/batteries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: await this.getToken(),
      },
      body: JSON.stringify(battery),
    });
    return this.handleResponse(response);
  },

  async update(battery: Battery) {
    const response = await fetch(`${API_URL}/batteries/${battery.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: await this.getToken(),
      },
      body: JSON.stringify(battery),
    });
    return this.handleResponse(response);
  },

  async delete(id: string) {
    const response = await fetch(`${API_URL}/batteries/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: await this.getToken(),
      },
    });
    return this.handleResponse(response);
  },
};
