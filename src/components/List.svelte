<script>
  // SVELTE
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // STATE
  import state from "../state.js";
</script>

<style>
  .list-container {
    display: flex;
    flex-wrap: wrap;
  }
  .box {
    width: 24%;
    padding: 2rem;
    margin-bottom: 0.2rem;
    margin-right: 0.2rem;
    border: 1px solid grey;
  }

  nav {
    margin-bottom: 1rem;
  }
</style>

<nav>
  <a href="/item/new">New</a>
</nav>

<div class="list-container">
  {#each state as study}
    <div class="box">
      <a href="/item/{study.id}">
        <h3>{study.key} {study.scale}</h3>
      </a>
    </div>
  {/each}

</div>
