<script>
  import { Key, Scale, Chord } from "@tonaljs/tonal";

  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let form = {
    key: "C",
    scale: "major"
  };

  let keys = [
    { label: "C", value: "c" },
    { label: "C#/Db", value: "c#" },
    { label: "D", value: "d" },
    { label: "D#/Eb", value: "d#" },
    { label: "E", value: "e" },
    { label: "F", value: "f" },
    { label: "F#/Gb", value: "f#" },
    { label: "G", value: "g" },
    { label: "G#/Ab", value: "g#" },
    { label: "A", value: "a" },
    { label: "A#/Bb", value: "a#" },
    { label: "B", value: "b" }
  ];
  let scales = [
    { label: "Major", value: "major" },
    { label: "Natural minor", value: "natural" },
    { label: "Harmonic minor", value: "harmonic" },
    { label: "Melodic minor", value: "melodic" }
  ];
  let base = {};
  let relations = {
    root: form.key,
    chords: null,
    selectedChord: null
  };
  let chords = [];

  let editMode = false;
  let updateIndex = null;

  onMount(() => {
    relations.selectedChord = relations.chords[0];
  });

  // quando cambia form.key / form.scale
  $: {
    let { natural, harmonic, melodic } = Key.minorKey(form.key);
    let major = Key.majorKey(form.key);
    let all = { major, natural, harmonic, melodic };
    base = all[form.scale];
	console.log(base);
	chords = [];
  }

  // quando cambia relations.root
  $: {
    let availableScales = base.chordScales.map(e => e.split(" ")[1]);
    let index = base.scale.findIndex(e => e === relations.root.toUpperCase());
    relations.chords = Scale.scaleChords(availableScales[index]); // si prendono solo gli accordi della scala
  }

  function save() {
    if (relations.selectedChord && relations.root) {
      let name = `${relations.root}${relations.selectedChord}`;
      let newChord = Object.assign({}, Chord.get(name), { name });
      newChord.newIntervals = [];
      newChord.newNotes = base.scale.map((e, i) => {
        if (newChord.notes.includes(e)) {
          return e;
        } else {
          return " ";
        }
      });
      newChord.newIntervals = newChord.newNotes.map((e, i) => {
        let index = newChord.notes.findIndex(a => a === e);
        if (index > -1) {
          return newChord.intervals[index];
        } else {
          return " ";
        }
      });
      console.log(newChord);
      if (editMode) {
        chords = [
          ...chords.slice(0, updateIndex),
          newChord,
          ...chords.slice(updateIndex + 1)
        ];
        editMode = false;
        updateIndex = null;
      } else {
        chords = [...chords, newChord];
      }
      // defauts
      relations.selectedChord = relations.chords[0];
      relations.root = form.key;
    }
  }

  function deleteChord(index) {
    chords = chords.filter((e, i) => i !== index);
  }

  function editChord(index) {
    let chord = chords.find((e, i) => i === index);
    relations.selectedChord = chord.name.substr(chord.tonic.length);
    relations.root = chord.tonic;
    editMode = true;
    updateIndex = index;
  }
</script>

<style>
  main {
    padding: 1em;
  }

  h5 {
    padding: 0px;
    margin: 0px;
    margin-bottom: 0.5rem;
  }

  .header {
    color: #47a01a;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 5rem;
    font-size: 2.5em;
    font-weight: 100;
  }

  .row {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: 1.5rem;
  }

  .col {
    align-self: center;
    margin-right: 0.5rem;
  }

  .btn {
    align-self: flex-end;
    flex: 1;
  }

  .muted {
    color: #b6b6b6;
  }

  .action {
    color: #47a01a;
  }

  .delete-btn {
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 600;
  }

  table {
  }

  td,
  th {
    width: 80px;
    text-align: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>

  <h2 class="header">Harmonic chords relationships</h2>

  <div class="row">
    <div class="col">
      <h5>Key</h5>
      <select bind:value={form.key}>
        {#each keys as key}
          <option value={key.value}>{key.label}</option>
        {/each}
      </select>
    </div>
    <div class="col">
      <h5>Scale</h5>
      <select bind:value={form.scale}>
        {#each scales as scale}
          <option value={scale.value}>{scale.label}</option>
        {/each}
      </select>
    </div>
    <div class="col">
      <h5>Grades</h5>
      <select bind:value={relations.root}>
        {#each base.scale as key}
          <option value={key}>{key}</option>
        {/each}
      </select>
    </div>
    <div class="col">
      <h5>Chords</h5>
      <select bind:value={relations.selectedChord}>
        {#each relations.chords as chord}
          <option value={chord}>{chord}</option>
        {/each}
      </select>
    </div>
    <div class="col btn">
      <button on:click={save} style="width:100%; cursor:pointer;">
        {editMode ? 'Update' : 'Add'}
      </button>
    </div>
  </div>

  <div class="row">
    <table>
      <tr>
        <th>Grades</th>
        {#each base.grades as grade}
          <th>{grade}</th>
        {/each}
      </tr>
      <tr>
        <td>Intervals</td>
        {#each base.intervals as interval}
          <td class="muted">{interval}</td>
        {/each}
      </tr>
      <tr>
        <td>Notes</td>
        {#each base.scale as note}
          <td>{note}</td>
        {/each}
      </tr>
    </table>
  </div>

  <div class="row">
    <table>
      {#each chords as chord, index}
        <tr transition:fade>
          <td />
          {#each chord.newIntervals as interval}
            <td class="muted">{interval}</td>
          {/each}
        </tr>
        <tr transition:fade>
          <td on:click={() => editChord(index)} style="cursor:pointer;">
            <strong class="action">{chord.name}</strong>
          </td>
          {#each chord.newNotes as note}
            <td>{note}</td>
          {/each}
          <td on:click={() => deleteChord(index)} class="action delete-btn">
            &times;
          </td>
        </tr>
      {/each}
    </table>
  </div>

</main>
