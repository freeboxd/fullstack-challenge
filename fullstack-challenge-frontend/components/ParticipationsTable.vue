<template>
  <div>
    <el-table
      :data="participationsData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="firstName"
        label="First Name"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="lastName"
        label="Last Name"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="participation"
        label="Participation"
      >
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="participationDataTotal"
        :current-page="participationDataPage"
        @current-change="$emit('current-change', $event)"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ParticipationInterface } from '../types';

@Component
export default class ParticipationTable extends Vue {
  @Prop({
    required: true,
    default: () => [],
    type: Array,
  }) public participationsData!: ParticipationInterface[];
  @Prop({
    required: true,
    default: 0,
    type: Number,
  }) public participationDataTotal!: number;
  @Prop({
    required: true,
    default: 0,
    type: Number,
  }) public participationDataLimit!: number;
  @Prop({
    required: true,
    default: 0,
    type: Number,
  }) public participationDataPage!: number;
}
</script>

<style>
.pagination {
  margin-top: 30px;
}
</style>