<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Sale from "./Sale";
import Card from "./Card";
import Observe from "./Observe";
export default {
  name: "BackstageIndex",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
  components: {
    Card,
    Sale,
    Observe,
  },
};
</script>

<style lang="scss" scoped>
</style>