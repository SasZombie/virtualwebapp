import { ref } from 'vue';

const validatePassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword && password.length > 0;
};

export function useRegisterForm() {

  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const error = ref('');

  const submitForm = async () => {
    const router = useRouter();

    if (!validatePassword(password.value, confirmPassword.value)) {
      error.value = "Passwords do not match!";
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      });

      if (response.status === 201) {
        error.value = '';
        router.push("login");

      } else {
        error.value = response.statusText;
        return;
      }

      name.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
    } catch (e) {
      error.value = 'An error occurred during registration.';
    }
  };

  const checkPasswords = () => {
    if(password.value === "" || confirmPassword.value === ""){
      return;
    }

    if(password.value.length < 3){
      error.value = "Passwords too short!";
      return;
    }

    if (!validatePassword(password.value, confirmPassword.value)) {
      error.value = "Passwords do not match!";
      return;
    }

    error.value = ""
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    error,
    submitForm,
    checkPasswords,
  };
}
