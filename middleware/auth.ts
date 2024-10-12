import type { User } from "@/types/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = useCookie<User | null>("user");

  if (!isLoggedIn.value) {
    return navigateTo("/login");
  }
});
