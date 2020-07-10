<script>
  import router from "page";
  import List from "./components/List.svelte";
  import Item from "./components/Item.svelte";
  import ErrorPage from "./components/ErrorPage.svelte";

  let page;
  let params;

  router("/", () => (page = List));
  router(
    "/item/:id",
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    () => (page = Item)
  );
  router('/*', () => (page = ErrorPage));

  router.start();
</script>

<style>
  .header {
    color: #47a01a;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 5rem;
    font-size: 2.5em;
    font-weight: 100;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>

<h2 class="header">Harmonic chords relationships</h2>
<div class="container">
  <svelte:component this={page} {params} />
</div>
