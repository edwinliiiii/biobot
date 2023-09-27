<template>
<div class="d-flex flex-row justify-content-center">
  <!-- kit search -->
  <div class='d-flex flex-column mt-5 search'>
    <p>Track your kit</p>
    <p v-if="err" class='text-danger fs-6 mt-2'> {{ err }}</p>
    <input v-model="label_input"
      @keyup.enter="searchKit(label_input);"
      @keyup="autocompleteKits(label_input)"
      placeholder="Enter label id"/>
    <p v-if="kit.data && kit.data.length > 0" class="mt-4">
      Kit {{ kit.data[0].label_id }} has tracking code: {{ kit.data[0].shipping_tracking_code }}
    </p>
  </div>

  <!-- autocomplete suggestions -->
  <div class='d-flex flex-column mt-5 ml-4'>
    <p v-if="recs?.data?.length > 0"> Suggestions </p>
    <div v-for="kit in recs.data">
      <p @click="autocomplete(kit.label_id)" class="fs-6 border recs"> {{kit.label_id}}</p>
    </div>
  </div>
</div>
</template>

<script> //83-130-0641
import { ref, computed } from 'vue';
import kitStore from '../store/kitStore';
import autocompleteStore from '../store/autocompleteStore';

export default {
  name: 'kitSearch',
  setup() {
    const label_input = ref('');
    const kit = computed(() => kitStore.getters.getKit());
    const err = ref('');
    const recs = computed(() => autocompleteStore.getters.getKits());
    
    const searchKit = async (label_id) => {
      try {
        await kitStore.dispatch('searchKit', label_id);
        if (kit.value.data[0]) {
          label_input.value = '';
          err.value = '';
        }
        else {
          err.value = 'Error: kit not found. check your kit label'
        }
      }
      catch (error) {
        err.value = error.message;
      }
    };

    const autocompleteKits = async (label_id) => {
      if (label_id.length >= 2 ) {
        try {
          await autocompleteStore.dispatch('searchKits', label_id);
        }
        catch (error) {
          console.log(error.message);
        }
      }
      else {
        try {
          await autocompleteStore.dispatch('searchKits', '');
        }
        catch (error) {
          console.log(error.message);
        }
      }
    };

    const autocomplete = async (label_id) => {
      label_input.value = label_id;
      await autocompleteKits(label_id);
    }

    return {
      searchKit,
      autocompleteKits,
      autocomplete,
      err,
      kit,
      recs,
      label_input
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
  max-width: 10em;
  margin: 5em
}

.recs:hover {
  background-color: yellow;
  cursor:pointer;
}
</style>
