<script setup lang="ts">
import useEyeDropper from "./composables/useEyeDropper";
import useCopyToClip from "./composables/useCopyToClip";

import { useSettingsStore } from "./stores/settings";
import { storeToRefs } from "pinia";

const settings = useSettingsStore();
const { color, colors } = storeToRefs(settings);

const { errMsg, startEyeDropper } = useEyeDropper();
const { copyToClip, isCopied } = useCopyToClip();
</script>

<template>
  <div class="box">
    <button class="box-item" @click="startEyeDropper()" 
    :style="{ backgroundColor: color }">
      <h2>Foreground</h2>
      <br />
      <p>{{ errMsg ? errMsg : color }}</p>
    </button>

    <div class="box-item">
      <div class="color-container">
        <div v-for="color in colors" :key="color" class="color-item">
          <div class="box-sm" :style="{ backgroundColor: color }"></div>
        </div>
      </div>
    </div>
  </div>

  <button class="copy-button" @click="copyToClip(color)">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 7V15C8 16.1046 8.89543 17 10 17H16M8 7V5C8 3.89543 8.89543 3 10 3H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V15C20 16.1046 19.1046 17 18 17H16M8 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H14C15.1046 21 16 20.1046 16 19V17"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  <button class="clear-button" @click="settings.clearColors()">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  <div v-if="isCopied" class="alert">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 7V15C8 16.1046 8.89543 17 10 17H16M8 7V5C8 3.89543 8.89543 3 10 3H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V15C20 16.1046 19.1046 17 18 17H16M8 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H14C15.1046 21 16 20.1046 16 19V17"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span>Copied</span>
  </div>
</template>
