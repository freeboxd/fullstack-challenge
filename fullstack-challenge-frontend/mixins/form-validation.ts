import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component
export default class FormValidationMixin extends Vue {
  // Validates the <form> and executes the correspondent callback
  public validateForm(
    formRef: any,
    validCb: () => void,
    notValidCb: () => void,
  ) {
    formRef.validate((valid: boolean) =>  {
      if (valid) {
        validCb();
      } else {
        notValidCb();
      }
    });
  }

  public resetForm(formRef: any) {
    formRef.resetFields();
  }
}
