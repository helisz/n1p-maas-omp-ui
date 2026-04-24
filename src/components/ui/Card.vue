<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import type { ClassValue } from 'clsx'

const props = defineProps<{ class?: ClassValue }>()
const classes = computed(() => cn('rounded-xl border border-border bg-card text-card-foreground shadow', props.class))
</script>

<template>
  <div :class="classes"><slot /></div>
</template>
<!-- [AI_END LINES=10 TIMESTAMP=2025-06-15 12:00:00] -->
