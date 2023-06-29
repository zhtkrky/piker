import { ref } from "vue";

const isCopied = ref(false);

function useCopyToClip() {
  function copyToClip(value: string) {
    const input = document.createElement("input");
    input.value = value;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    isCopied.value = true;

    setTimeout(() => {
      isCopied.value = false;
    }, 1500);
  }

  return {
    isCopied,
    copyToClip,
  };
}

export default useCopyToClip;
