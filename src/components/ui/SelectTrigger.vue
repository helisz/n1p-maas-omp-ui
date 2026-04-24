<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { SelectTrigger as RadixSelectTrigger, SelectIcon, SelectValue } from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps<{
  class?: string
  placeholder?: string
}>()

const classes = computed(() =>
  cn(
    'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    props.class
  )
)
</script>

<template>
  <RadixSelectTrigger :class="classes">
    <SelectValue :placeholder="placeholder" />
    <SelectIcon as-child>
      <ChevronDown class="h-4 w-4 opacity-50" />
    </SelectIcon>
  </RadixSelectTrigger>
</template>
<!-- [AI_END LINES=30 TIMESTAMP=2025-06-15 12:00:00] -->
