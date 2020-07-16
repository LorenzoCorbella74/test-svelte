<script>
  import { fade } from "svelte/transition";

  import { Router, Link, Route } from "svelte-routing";

  import List from "./components/List.svelte";
  import Item from "./components/Item.svelte";
  import ErrorPage from "./components/ErrorPage.svelte";

  export let url = "/";
</script>

<style>
  :global(a:link) {
    font-size: 1rem;
    font-weight: 700;
  }
  :global(a:link) {
    color: #47a01a;
    text-decoration: none;
  }
  :global(a:visited) {
    color: #47a01a;
    text-decoration: none;
  }
  :global(a:hover) {
    color: hotpink;
    text-decoration: none;
  }
  :global(a:active) {
    color: #47a01a;
    text-decoration: none;
  }

  :global(.delete-btn) {
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 700;
  }
  :global(.delete-btn:hover) {
    color: hotpink;
  }
  :global(.primary) {
    color: #47a01a;
  }
  :global(.muted) {
    color: #b6b6b6;
  }

  .header {
    color: #47a01a;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 5rem;
    font-size: 2.2em;
    font-weight: 400;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>

<h2 class="header">Harmonic chords relationships</h2>
<div class="container">
  <!--  transition:fade -->
  <Router {url}>

    <Route path="/">
      <List />
    </Route>
    <Route path="/item/:id" let:params>
      <Item id={params.id} />
    </Route>

  </Router>
</div>
