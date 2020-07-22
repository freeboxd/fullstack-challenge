<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <NavBar />
    </el-aside>
    <el-container>
      <el-header>
        <NewParticipationForm
          :participationForm="participationForm"
          :participationFormRules="participationFormRules"
          :sendPending="$fetchState.pending"
          @send-form="submitForm($event)"
        />
      </el-header>
      <el-main>
        <h1>DATA</h1>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <ParticipationsTable
              :participationsData="participationsData"
              :participationDataTotal="participationDataTotal"
              :participationDataLimit="participationDataLimit"
              :participationDataPage="participationDataPage"
              @current-change="onChangeCurrentTablePage"
            />
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <DonutChart
              :chartData="allParticipationsData"
            />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, mixins } from 'nuxt-property-decorator';
import Participation from '../models/participation';
import participationsService from '../services/participations.service';
import FormValidationMixin from '../mixins/form-validation';
import { ParticipationInterface } from '../types';
import DonutChart from '../components/DonutChart.vue';

@Component({
  components: {
    DonutChart,
  }
})
export default class Index extends mixins(FormValidationMixin) {
  public participationForm = new Participation('', '', null);

  public participationFormRules = {
    firstName: [
      { required: true, trigger: 'blur' },
    ],
    lastName: [
      { required: true, trigger: 'blur' },
    ],
    participation: [
      { required: true, trigger: 'blur' },
    ],
  };

  public allParticipationsData: ParticipationInterface[] = [];
  public participationsData: ParticipationInterface[] = [];
  public participationDataTotal: number = 1;
  public participationDataLimit: number = 10;
  public participationDataPage: number = 1;

  public get participationsDataSkip(): number {
    return (this.participationDataPage - 1) * this.participationDataLimit;
  };

  public get isLoggedIn() {
    return this.$store.getters['auth/loggedIn'];
  }

  public get series() {
    let arr: any = [];
    this.participationsData.map((x: any) => {
      arr.push(x.participation);
    });

    return arr;
  };

  public mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/authentication');
    }
  }

  // Hook for fetching the participations data from the API
  public async fetch() {
    let participationsDataResponse;
    try {
      participationsDataResponse = (await participationsService.getParticipations(
        {
          $skip: this.participationsDataSkip,
          $limit: this.participationDataLimit
        },
      ) as any).data;
      this.participationsData = participationsDataResponse.data;
      this.participationDataTotal = participationsDataResponse.total;

      this.allParticipationsData = (await participationsService.getParticipations(
        {
          $limit: this.participationDataTotal
        },
      ) as any).data.data;
    } catch (e) {
      if (e.response) {
        this.$message.error(e.response.message);
      } else {
        this.$message.error('Unexpected error occurred.');
      }
    }
  }

  public submitForm(formRef: HTMLFormElement) {
    this.validateForm(
      formRef,
      () => this.addNewParticipation(this.participationForm) as any,
      () => this.$message.error('Please review all the form fields.') as any,
    );
  }
  
  // Attempts to add a new participant through the API
  // executes a success response handler if it works
  // executes a error response handler otherwise
  public async addNewParticipation(participationForm: ParticipationInterface) {
    await participationsService.addParticipation(participationForm)
    .then(
      (response) => this.handleAddNewParticipationSuccess(response),
      ({response}) => this.handleAddNewParticipationError(response),
    );
  }

  // Handler for a success response on adding a new participation
  // displays a success message to the user
  // clears the form
  // fetches the new data
  public handleAddNewParticipationSuccess(response: any) {
    this.$message({
      message: 'Participation succesfully added.',
      type: 'success',
    });
    this.participationForm = new Participation('', '', null);
    this.$fetch();
  }

  public handleAddNewParticipationError(response: any) {
    let message: string = '';
    if (response) {
      message = response.data.message;
    } else {
      message = 'Unexpected error occurred.';
    }
    this.$message.error(message);
  }

  public onChangeCurrentTablePage(e: number) {
    this.participationDataPage = e;
    this.$fetch();
  }
}
</script>

<style>
.el-header {
  background-color: #00b8e2;
  color: #333;
  text-align: center;
  height: auto !important;
  padding: 30px 0;
}

.el-main {
  text-align: center;
}

.pagination {
  margin-top: 30px;
}
</style>