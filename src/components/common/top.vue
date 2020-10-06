<template>
  <el-page-header>
    <span slot="title" class="el-icon-arrow-left" @click="goBack"></span>
    <span slot="content">{{ title }}</span>
  </el-page-header>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>
