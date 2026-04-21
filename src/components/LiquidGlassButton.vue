<template>
  <button class="liquid-glass-btn" :class="{ 'liquid-glass-btn-hover': hoverEffect }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'LiquidGlassButton',
  props: {
    hoverEffect: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.liquid-glass-btn {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  transition: transform 0.3s ease, background 0.3s ease;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.liquid-glass-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255,255,255,0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.liquid-glass-btn-hover:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.liquid-glass-btn-hover:hover::before {
  opacity: 1;
}
</style>