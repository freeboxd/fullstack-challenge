<template>
  <el-container>
    <el-main class="container">
      <el-card class="box-card" body-style="padding: 20px 90px 0;">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px">Authentication</span>
        </div>
        <Logo />
        <AuthenticationForm
          :authenticationForm="authForm"
          :userFormRules="userFormRules"
          @send-form="submitForm($event)"
        />
        <el-link @click="$router.push('/registration')" type="primary">Create account</el-link>
      </el-card>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, mixins } from 'nuxt-property-decorator';
import { Route } from "vue-router";
import Element from 'element-ui';
import User from '../models/user';
import AuthenticationMixin from '../mixins/authentication';
import FormValidationMixin from '../mixins/form-validation';

@Component
export default class Authentication extends mixins(AuthenticationMixin, FormValidationMixin) {
  public authForm = new User('', '');

  // Validates the form,
  // executes the authentication function if valid,
  // displays an error message otherwise
  public submitForm(formRef: HTMLFormElement) {
    this.validateForm(
      formRef,
      () => this.authenticate(this.authForm) as any,
      () => this.$message.error('Please review all the form fields.') as any,
    );
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.el-card {
  padding-bottom: 20px;
}
</style>
