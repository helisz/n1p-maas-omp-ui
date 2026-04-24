<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { SelectRoot, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<{
  modelValue?: string
  defaultValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <SelectRoot v-bind="forwarded"><slot /></SelectRoot>
</template>
<!-- [AI_END LINES=17 TIMESTAMP=2025-06-15 12:00:00] -->
