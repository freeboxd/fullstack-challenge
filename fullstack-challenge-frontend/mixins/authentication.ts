import Vue from 'vue';
import { Component, Prop, mixins } from 'nuxt-property-decorator';
import { UserInterface } from '~/types';

@Component
export default class AuthenticationMixin extends Vue {

  // Validation rules for the authentication form
  public userFormRules = {
    email: [
      { required: true, trigger: 'blur' },
    ],
    password: [
      { required: true, trigger: 'blur' },
    ],
  };
  
  // Returns if the user is logged
  public get isLoggedIn() {
    return this.$store.getters['auth/loggedIn'];
  }

  // Authenticates in the store
  // sends the client to the index page in case of success
  // executes error handler otherwise
  public authenticate(authForm: UserInterface) {
    this.$store.dispatch('auth/authenticate', authForm).then(
      (response) => {
        this.$router.push('/');
      },
      (error) => {
        this.handleAuthenticationError(error);
      }
    );
  }

  public logout() {
    this.$store.dispatch('auth/logout').then(
      () => {
        this.$router.push('/authentication');
      }
    );
  }

  // Displays an error message if the API returns one
  // displays default message otherwise
  public handleAuthenticationError({response}: any) {
    let message: string = '';
    if (response) {
      message = response.data.message;
    } else {
      message = 'Unexpected error ocurred.'
    }
    this.$message.error(message);
  }
}
