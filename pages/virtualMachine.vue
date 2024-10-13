<template>
    <div @mousemove="sendMousePosition" @click="sendMouseClick" @keydown="sendKey" tabindex="0">
        Hello
        <video ref="streamVideo" autoplay></video>

    </div>
</template>

<script lang="ts" setup>
import type { User } from '@/types/user';
import Peer from 'simple-peer';
import io from 'socket.io-client'



const streamVideo = ref<HTMLVideoElement | null>(null);
const socket = io('http://localhost:3000');


const sendMousePosition = (event: MouseEvent) => {
    socket.emit('mouseMove', { x: event.clientX, y: event.clientY });
};

const sendMouseClick = (event: MouseEvent) => {
    socket.emit('mouseClick', { x: event.clientX, y: event.clientY });
};

const sendKey = (event: KeyboardEvent) => {
    socket.emit('keyPress', { key: event.key });
};

onMounted(() => {
    const peer = new Peer({ initiator: true, trickle: false });
    socket.on('signal', data => {
        peer.signal(data);
    })

    peer.on('signal', data => {
        socket.emit('signal', data);
    });

    peer.on('stream', stream => {
        if (streamVideo.value) {
            streamVideo.value.srcObject = stream;
        }

    })
})


const userCookie = useCookie<User | null>("user");
const user = useState<User | null>("user", () => userCookie.value || null);

console.log(user.value?.selectedVm || "Nu e selectata");

definePageMeta({
    middleware: 'auth'
});
</script>