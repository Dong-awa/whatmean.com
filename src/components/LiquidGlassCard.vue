<template>
  <div class="liquid-glass-card" :class="{ 'liquid-glass-card-hover': hoverEffect }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LiquidGlassCard',
  props: {
    hoverEffect: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.liquid-glass-card {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.liquid-glass-card::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.01));
  z-index: -1;
  border-radius: 30px;
  transition: all 0.4s ease;
}

.liquid-glass-card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(31, 38, 135, 0.2);
}

.liquid-glass-card-hover:hover::before {
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
}
</style>