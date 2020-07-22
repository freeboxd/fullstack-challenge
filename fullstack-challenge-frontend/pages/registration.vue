<template>
  <el-container>
    <el-main class="container">
      <el-card class="box-card" body-style="padding: 20px 90px 0;">
        <div slot="header" class="clearfix">
          <span style="font-size: 18px">Registration</span>
        </div>
        <Logo />
        <RegistrationForm
          :registrationForm="registrationForm"
          :userFormRules="userFormRules"
          @send-form="submitForm($event)"
        />
        <el-link @click="$router.push('/authentication')" type="primary">Already have an account? Log in!</el-link>
      </el-card>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, mixins } from 'nuxt-property-decorator';
import { UserInterface } from '../types';
import AuthenticationMixin from '../mixins/authentication';
import User from '../models/user';
import FormValidationMixin from '../mixins/form-validation';

@Component
export default class Registration extends mixins(AuthenticationMixin, FormValidationMixin) {
  public registrationForm = new User('', '');

  // Validates the form,
  // executes the registration function if valid,
  // displays an error message otherwise
  public submitForm(formRef: HTMLFormElement) {
    this.validateForm(
      formRef,
      () => this.register(this.registrationForm) as any,
      () => this.$message.error('Please review all the form fields.') as any,
    );
  }

  // Attempts to register with the form's info
  // executes success handler function if API returns ok
  // executes error handler function otherwise
  public register(registrationForm: UserInterface) {
    (this.$store.dispatch('auth/register', registrationForm))
    .then(
      (response) => {
        this.handleRegistrationSuccess(response);
      },
      ({response}) => {
        this.handleRegistrationError(response);
      }
    );
  }

  // Displays a success message and executes authentication function
  public handleRegistrationSuccess(response: any) {
    this.$message({
      message: 'Registration success.',
      type: 'success'
    });
    this.authenticate(this.registrationForm);
  }

  // Displays an error message if the API returns one
  // displays default message otherwise
  public handleRegistrationError(response: any) {
    let message: string = '';
    if (response) {
      message = response.data.message;
    } else {
      message = 'Unexpected error occurred.';
    }
    this.$message.error(message);
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
