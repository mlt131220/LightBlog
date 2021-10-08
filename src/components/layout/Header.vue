<script lang="ts" setup>
import { h, ref,inject } from 'vue'
import { NIcon, NMenu, NSwitch, NGradientText,NPopover } from 'naive-ui'
import {
  FileRegular as File,
  EditRegular as Edit,
  Plus as Add,
  Link as Help
} from '@vicons/fa'

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const t:any = inject("t");
const menuOptions = ref([
  {
    label: t("layout.header.File"),
    key: 'tools-files',
    icon: renderIcon(File),
  },
  {
    label: t("layout.header.Edit"),
    key: 'tools-edit',
    icon: renderIcon(Edit),
  },
  {
    label: t("layout.header.Add"),
    key: 'tools-add',
    icon: renderIcon(Add),
  },
  {
    label: t("layout.header.Help"),
    key: 'tools-help',
    icon: renderIcon(Help),
  }
])

const activeKey = ref(null);
const switchActive = ref(false);
const switchChange = (value: boolean) => {
  console.log(`Update value: ${value}`)
}
</script>

<template>
  <n-popover trigger="hover">
    <template #trigger>
      <n-gradient-text :size="24" type="success">逆光</n-gradient-text>
    </template>
    <span>ThreeJS Editor For Vue3.2</span>
  </n-popover>

  <n-menu v-model:value="activeKey" mode="horizontal" dropdown-placement="top-start" :options="menuOptions" />

  <n-switch v-model:value="switchActive" @update:value="switchChange">
    <template #checked>{{t("layout.header.autosave")}}</template>
    <template #unchecked>{{t("layout.header.autosave")}}</template>
  </n-switch>
  <n-gradient-text class="gradient-text" type="success">r132</n-gradient-text>
</template>

<style lang="scss" scoped>
.n-menu.n-menu--horizontal {
  :deep(.n-menu-item-content) {
    padding: 0 0.5rem;
  }
}
.n-switch,
.gradient-text {
  position: absolute;
  right: 0.5rem;
}
.n-switch {
  right: 3rem;
}
</style>
