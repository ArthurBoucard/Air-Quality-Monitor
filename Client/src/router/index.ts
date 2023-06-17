import { createRouter, createWebHistory } from "vue-router";
import indexVue from "@/pages/index.vue";
import defaultLayout from "@/layouts/default.vue";
import AirQualityVue from "@/pages/AirQuality.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: indexVue,
      meta: {
        layout: defaultLayout,
      },
    },
    {
        path: "/quality",
        name: "quality",
        component: AirQualityVue,
        meta: {
            layout: defaultLayout,
        },
    }
  ],
});

router.beforeEach(async (to) => {

});

export default router;