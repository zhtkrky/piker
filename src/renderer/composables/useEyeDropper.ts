import { ref } from "vue";
import { useSettingsStore } from "../stores/settings";

interface EyeDropper {
  open: () => Promise<{ sRGBHex: string }>;
}

declare global {
  interface Window {
    EyeDropper: EyeDropper;
  }
}

function useEyeDropper() {
  const settings = useSettingsStore();

  const errMsg = ref();

  function startEyeDropper() {
    if (!window.EyeDropper) {
      errMsg.value = "Your browser does not support the EyeDropper API";
      return;
    }

    // @ts-ignore
    const eyeDropper = new EyeDropper();

    eyeDropper
      .open()
      .then((result: { sRGBHex: string }) => {
        settings.updateColor(result.sRGBHex);
        settings.updateColors(result.sRGBHex);
      })
      .catch((err: string) => {
        errMsg.value = err;
      });
  }

  return {
    errMsg,
    startEyeDropper,
  };
}

export default useEyeDropper;
