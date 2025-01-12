<template>
    <div>

        <!-- Main content -->
        <div class="h-screen w-screen bg-gradient-to-bl from-red-700 via-orange-500 to-yellow-500">
            <main class="p-4">
                <div class="global-text">
                    <slot />
                </div>
            </main>

        </div>

    </div>
</template>

<style scoped>
.global-text {
    font-family: 'Arial', sans-serif;
    color: white;
    line-height: 1.6;
}
</style>