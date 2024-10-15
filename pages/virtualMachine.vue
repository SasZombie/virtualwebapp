<template>
  <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999;">
    <iframe
      style="width: 100%; height: 100%; border: none;"
      src="http://localhost:6080/vnc.html"
      allow="fullscreen"   
      allowfullscreen      
      sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '@/types/user';


const userCookie = useCookie<User | null>("user");
const user = useState<User | null>("user", () => userCookie.value || null);

console.log(user.value?.selectedVm || "Nu e selectata");

definePageMeta({
  middleware: 'auth'
});
</script>