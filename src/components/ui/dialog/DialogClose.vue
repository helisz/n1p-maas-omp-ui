<script setup lang="ts">
import type { DialogCloseProps } from "reka-ui";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps<DialogCloseProps>();
</script>

<template>
  <XMarkIcon data-slot="dialog-close" v-bind="props">
    <slot />
  </XMarkIcon>
</template>
