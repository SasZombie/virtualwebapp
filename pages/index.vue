<script setup lang="ts">

</script>

<template>
  <div>

    <p class="text-right">
      Yapping main page despre noi, tre sa pun butoane pentru register si log ain
    </p>

    <br>
    <!-- Div for centering -->
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="flex flex-col items-center justify-center space-y-4">

      <NuxtLink to="/login">
        <button class = "buttonCss w-[350px] h-[100px]"> Login </button> <br>
      </NuxtLink>

      <NuxtLink to="/register">
        <button class = "buttonCss w-[350px] h-[100px] "> Register </button> <br>
      </NuxtLink>
    </div>
  </div>

</template>