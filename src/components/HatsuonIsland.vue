<template>
    <div>
        <img :src="data" />

        <div class="flex flex-col space-y-4">
            <input class="bg-white p-2" v-model="state.str" />
            <div class="flex flex-row text-white justify-evenly space-x-4">
                <div class="flex flex-col items-center font-bold space-y-2" v-for="p, i in state.pitches">
                    <button @click="() => modifyPitch(p, i, 'inc')" class="bg-muse rounded p-1 px-2">+</button>
                    <span class="text-2xl">{{ p }}</span>
                    <button @click="() => modifyPitch(p, i, 'dec')" class="bg-muse rounded p-1 px-2">-</button>
                </div>
            </div>
            <button @click="() => render(state)" class="bg-treelar h-12 rounded text-xl text-white">
                <div v-if="loading" class="mx-auto h-5 w-5 bg-white rounded animate-spin"></div>
                <span v-else>Go!</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import G from "grapheme-splitter"
import { trpc } from '~/trpc';

const gs = new G()

const state = reactive({
    str: "こまる",
    pitches: [1,0,0]
})

const MODIFY_COMMANDS = ["inc", "dec"] as const
type MCE = typeof MODIFY_COMMANDS[number]

watch(
    () => state.str,
    (s) => {
        state.pitches = Array(gs.countGraphemes(s)).fill(0)
    }
)

const modifyPitch = (p: number, i: number, c: MCE) => {
    if (c == "dec") {
        // JS makes -1%2 = -1 instead of 1
        state.pitches[i] = (((p - 1) % 3) + 3) % 3
    }
    if (c == "inc") {
        state.pitches[i] = (p + 1) % 3
    }
}

const data = ref("")
const loading = ref(false)
const render = async (s: typeof state) => {
    loading.value = true
    data.value = await trpc.hatsuon.render.query(s)
    loading.value = false
}
</script>