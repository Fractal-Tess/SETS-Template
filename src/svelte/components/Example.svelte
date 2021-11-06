<script lang="ts">
  export let greeting: string;
  let version: any;
  const get_version = async () => {
    version = await window.api.GetVersion();
  };
</script>

<main>
  <h1>{greeting}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte
    apps.
  </p>
  <button on:click="{get_version}"> {version || 'Get version'}</button>
</main>

<style type="text/scss">
  @import './scss/vars';
  main {
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    * {
      margin-top: 1em;
    }

    h1 {
      font-size: 4rem;
      color: $Color;
      text-transform: uppercase;
      font-weight: 500;
    }
    a {
      color: aqua;
    }
    button {
      width: 30%;
      font-size: 2em;
      border-radius: 8px;
    }
  }
</style>
