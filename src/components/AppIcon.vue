<template><image class="app-icon" :src="`/static/icons/${name}.png`" mode="aspectFit" :style="{ width: `${size}px`, height: `${size}px` }" /></template>
<script setup>
defineProps({ name: { type: String, default: 'heart' }, size: { type: Number, default: 20 } })
</script>
<style scoped>.app-icon { display: inline-block; flex-shrink: 0; vertical-align: middle; }</style>
