<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { TabsRoot, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<{
  defaultValue?: string
  modelValue?: string
  class?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const classes = computed(() => cn(props.class))
const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <TabsRoot v-bind="forwarded" :class="classes">
    <slot />
  </TabsRoot>
</template>
<!-- [AI_END LINES=24 TIMESTAMP=2025-06-15 12:00:00] -->
