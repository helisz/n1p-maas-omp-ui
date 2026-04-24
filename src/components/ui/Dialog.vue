<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { DialogRoot, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<{
  open?: boolean
  class?: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <slot />
  </DialogRoot>
</template>
<!-- [AI_END LINES=20 TIMESTAMP=2025-06-15 12:00:00] -->
