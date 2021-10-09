<script lang="ts" setup>
import { ref, inject, computed } from 'vue'
import { NMenu, NGradientText, NPopover,NButton } from 'naive-ui'

const t: any = inject("t");
const menuOptions = computed(() => {
  return [
    {
      label: t("layout.header.Home"),
      key: 'Home',
    },
    {
      label: t("layout.header.Tags"),
      key: 'Tags',
    },
    {
      label: t("layout.header.Archive"),
      key: 'Archive',
    },
    {
      label: t("layout.header.Gossiped"),
      key: 'Gossiped',
    },
    {
      label: t("layout.header['Friendship link']"),
      key: 'FriendshipLink',
    },
    {
      label: t("layout.header['Leave comments']"),
      key: 'LeaveComments',
    },
    {
      label: t("layout.header.About"),
      key: 'About',
    },
    {
      label: t("layout.header.Navigation"),
      key: 'Navigation',
    }
  ]
});

const activeMenuKey = ref(null);
</script>

<template>
  <div id="header">
    <n-popover trigger="hover">
      <template #trigger>
        <n-gradient-text
          :size="24"
          type="success"
        >{{ t("layout.header['Tell the shadow to love her']") }}</n-gradient-text>
      </template>
      <span>{{ t("layout.header['Love is to be remnant while Romance remains']") }}</span>
    </n-popover>

    <n-menu
      v-model:value="activeMenuKey"
      mode="horizontal"
      dropdown-placement="top-start"
      :options="menuOptions"
    />

    <div>
      <n-button type="success" size="small">{{t("layout.header['Log in']")}}</n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#header {
  width:100%;
  display: flex;
  justify-content: space-between;

  .n-menu.n-menu--horizontal {
    :deep(.n-menu-item-content) {
      padding: 0 0.5rem;
    }
  }
}
</style>
