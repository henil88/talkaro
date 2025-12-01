import { store } from "../store";

export async function requireAuth() {
  const { token } = store.getState().auth;
  if (!token) {
    throw new Response("Unauthorized", {
      status: 302,
      headers: { Location: "/auth" },
    });
  }
  return null;
}
