<template>
  <el-menu :default-openeds="['1', '3']">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-user"></i>Auth</template>
      <el-menu-item @click="logout">
        <i class="el-icon-bottom-left"></i>Logout
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { Vue, Component, mixins } from 'nuxt-property-decorator';
import AuthenticationMixin from '../mixins/authentication';

@Component
export default class NavBar extends mixins(AuthenticationMixin) {
}
</script>