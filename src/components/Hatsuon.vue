<template>
    <div class="">
        <img :src="data"/>
        
        <div class="flex flex-col space-y-2">
            <input class="bg-white p-2" v-model="state.str"/>
            <button @click="render" class="bg-treelar p-2 rounded text-xl text-white">Render</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { trpc } from '~/trpc';

const state = reactive({
    str: "こまる",
    pitches: [1,0,0]
})

const data = ref("")

const render = async () => {
    data.value = await trpc.hatsuon.render.query(state)
}
</script>