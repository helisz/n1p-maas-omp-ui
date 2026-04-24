<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { DialogDescription } from 'radix-vue'

const props = defineProps<{ class?: string }>()
const classes = computed(() => cn('text-sm text-muted-foreground', props.class))
</script>

<template>
  <DialogDescription :class="classes"><slot /></DialogDescription>
</template>
<!-- [AI_END LINES=12 TIMESTAMP=2025-06-15 12:00:00] -->
