<template>
  <el-form
    status-icon
    ref="authenticationForm"
    :rules="userFormRules"
    :model="authenticationForm"
    @submit.prevent.native="$emit('send-form', $refs['authenticationForm'])"
  >
    <el-form-item label="Email" prop="email">
      <el-input type="text" placeholder="email@example.com" v-model="authenticationForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" placeholder="*******" v-model="authenticationForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item style="margin-top: 40px">
      <el-button type="primary" @click="$emit('send-form', $refs['authenticationForm'])">Authenticate</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ParticipationInterface, UserInterface } from '../types';

@Component
export default class AuthenticationForm extends Vue {
  @Prop({
    required: true,
    default: () => {},
    type: Object,
  }) public authenticationForm!: UserInterface[];
  @Prop({
    required: true,
    default: () => {},
    type: Object,
  }) public userFormRules!: any;
}
</script>