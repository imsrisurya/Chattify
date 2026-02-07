import { axiosInstance } from "./axios";
export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("error in getAuthUser:", error);
    return null;
  }

};
export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};

export async function getUserFriends() {
  const res = await axiosInstance.get("/user/friends");
  return res.data;
}

export async function getRecommendedUsers() {
  const res = await axiosInstance.get("/user/all");
  return res.data;
}

export async function getOutgoingFriendReqs() {
  const res = await axiosInstance.get("/user/outgoing-friend-requests");
  return res.data;
}

export async function getFriendRequests() {
  const res = await axiosInstance.get(`/user/friend-requests`);
  return res.data;
}

export async function acceptFriendRequest(userId) {
  const res = await axiosInstance.post(`/user/friend-request/${userId}/accept`);
  return res.data;
}

export async function sendFriendRequest(userId) {
  const res = await axiosInstance.post(`/user/friend-request/${userId}`);
  return res.data;
}

export async function getStreamToken() {
  const res = await axiosInstance.post("chat/token");
  return res.data;
}
