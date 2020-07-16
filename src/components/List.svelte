<script>
  // SVELTE
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { Link } from "svelte-routing";

  // STATE
  import state from "../state.js";

  let list = [];

  onMount(() => {
    list = state.get();
  });

  function deleteChord(index) {
    state.remove(index);
    list = state.get();
  }
</script>

<style>
  .list-container {
    display: flex;
    flex-wrap: wrap;
  }
  .box {
    width: 24%;
    padding: 1rem;
    margin-bottom: 0.2rem;
    margin-right: 0.2rem;
    border: 1px solid #b6b6b6;
  }

  .flex-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav {
    margin-bottom: 1rem;
  }
</style>

<nav>
  <Link to="/item/new">New</Link>
</nav>

<div class="list-container">
  {#each list as study, index}
    <div class="box">
      <div class="flex-content">
        <Link to="/item/{study.id}">
          <h3>{study.key} {study.scale}</h3>
        </Link>
        <span on:click={()=>deleteChord(index)} class="primary delete-btn">
          &times;
        </span>
      </div>
    </div>
  {/each}

</div>
