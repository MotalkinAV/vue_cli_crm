import { i18n } from "@/plugins/i18n.plugin";
import { computed } from "vue";

export const links = computed(() => {
  return [
    { title: i18n('TitleBill'), url: "/", icon: "account_balance_wallet", exact: true },
    { title: i18n('TitleHistory'), url: "/history", icon: "donut_large" },
    { title: i18n('TitlePlanning'), url: "/planning", icon: "assessment" },
    { title: i18n('TitleRecord'), url: "/record", icon: "create" },
    { title: i18n('TitleCategories'), url: "/categories", icon: "event_note" },
  ]
})