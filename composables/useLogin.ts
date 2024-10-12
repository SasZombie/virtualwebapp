import type { User } from "@/types/user";

export const useLogin = () => {
  const email = ref("");
  const password = ref("");
  const error = ref("");
  const userCookie = useCookie<User | null>("user");
  const user = useState<User | null>("user", () => userCookie.value || null);
  const router = useRouter();

  if (user.value) {
    router.push("/loggedIn");
  }

  const submitForm = async () => {
    error.value = "";
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      if (response.status === 202) {
        const userData = await response.json();
        user.value = {
          email: userData.email,
          name: userData.name,
          virtualMachinesIDs: userData.virtualMachinesIDs,
        };

        userCookie.value = user.value;
        email.value = "";
        password.value = "";
        router.push("/loggedIn");
      }

      error.value = response.statusText;
    } catch (e) {
      error.value = "Error accured durin registration";
      console.log("Error Occurred", e);
    }
  };

  return {
    email,
    password,
    error,
    submitForm,
  };
};

export const logout = () => {
  const userCookie = useCookie<User | null>("user");
  const user = useState<User | null>("user", () => userCookie.value || null);
  const router = useRouter();
  user.value = null;
  userCookie.value = null;

  router.push("/");
};