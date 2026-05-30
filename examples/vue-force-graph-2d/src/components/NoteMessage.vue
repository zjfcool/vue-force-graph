<template>
  <div class="note-message">
    <slot name="note"></slot>
  </div>
  <slot></slot>
</template>
<style scoped>
.note-message {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: silver;
}
</style>
