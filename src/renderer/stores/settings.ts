import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export type Format = "hex" | "rgb" | "hsl";

export const useSettingsStore = defineStore("settings", () => {
  const settings = ref({
    color: useLocalStorage("color", "" as string),
    colors: useLocalStorage("colors", [] as string[]),
  });

  const color = computed(() => settings.value.color);
  const colors = computed(() => settings.value.colors);

  function updateColor(color: string) {
    settings.value.color = color;
  }

  function updateColors(color: string) {
    if (settings.value.colors.length <= 8 && !settings.value.colors.includes(color)) {
      settings.value.colors.push(color);
    }
  }

  function clearColors() {
    settings.value.colors = [];
  }

  return {
    color,
    colors,
    updateColor,
    updateColors,
    clearColors,
  };
});
