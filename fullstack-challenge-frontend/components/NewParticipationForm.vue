<template>
  <el-form
    status-icon
    ref="participationForm"
    :model="participationForm"
    :rules="participationFormRules"
    @submit.prevent.native="$emit('send-form', $refs['registrationForm'])"
  >
    <div class="row" :gutter="20">
      <div class="col-sm-12 col-lg-3">
        <el-form-item prop="firstName">
          <el-input
            type="text"
            placeholder="First Name"
            v-model="participationForm.firstName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </div>
      <div class="col-sm-12 col-lg-3">
        <el-form-item prop="lastName">
          <el-input
            type="text"
            placeholder="Last Name"
            v-model="participationForm.lastName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </div>
      <div class="col-sm-12 col-lg-3">
        <el-form-item prop="participation">
          <el-input
            type="text"
            placeholder="Participation"
            v-model="participationForm.participation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </div>
      <div class="col-sm-12 col-lg-3">
        <el-form-item class="send-button">
          <el-button :loading="sendPending" @click="$emit('send-form', $refs['participationForm'])">SEND</el-button>
        </el-form-item>
      </div>
      <!-- <div class="col-sm-12 col-md-6"> -->
      <!-- </div> -->
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ParticipationInterface } from '../types';

@Component
export default class NewParticipationForm extends Vue {
  @Prop({
    required: true,
    default: () => {},
    type: Object,
  }) public participationForm!: ParticipationInterface[];
  @Prop({
    required: true,
    default: () => {},
    type: Object,
  }) public participationFormRules!: any;
  @Prop({
    required: false,
    default: false,
    type: Boolean,
  }) public sendPending!: boolean;
}
</script>

<style>
@import url('../node_modules/bootstrap/dist/css/bootstrap-grid.min.css');
.el-form {
  max-width: 900px;
  margin: 0 auto;
}

/* .form-col {
  flex: 1;
  flex-wrap: wrap;
} */

.el-form-item {
  margin: 13px 5px;
}

.el-form-item::placeholder {
  color: #000;
  opacity: 1;
}

.send-button {
  width: 100%;
}
</style>