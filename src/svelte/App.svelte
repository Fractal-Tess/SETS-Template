<script lang="ts">
  import Example from './components/Example.svelte';
  import Background from './components/Background.svelte';
</script>

<app class="app">
  <Background />
  <Example greeting="Hello Svelte" />
</app>

<style type="text/scss">
  .app {
    color: white;
    position: absolute;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
</style>
