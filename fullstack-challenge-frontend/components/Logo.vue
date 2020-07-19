<template>
  <img
    src="../assets/cotabox-logo.png"
    :style="'width:' + size + 'px; height: auto'"
  />
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

@Component
export default class Logo extends Vue {
  @Prop({ required: false, default: '220', type: String }) public size!: string;
}

</script>

<style>
@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
