<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { SelectItem as RadixSelectItem, SelectItemIndicator, SelectItemText } from 'radix-vue'
import { Check } from 'lucide-vue-next'

const props = defineProps<{
  value: string
  class?: string
  disabled?: boolean
}>()

const classes = computed(() =>
  cn(
    'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.class
  )
)
</script>

<template>
  <RadixSelectItem :value="value" :disabled="disabled" :class="classes">
    <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <Check class="h-4 w-4" />
      </SelectItemIndicator>
    </span>
    <SelectItemText><slot /></SelectItemText>
  </RadixSelectItem>
</template>
<!-- [AI_END LINES=32 TIMESTAMP=2025-06-15 12:00:00] -->
