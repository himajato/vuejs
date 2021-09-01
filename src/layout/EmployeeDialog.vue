<template>
  <div class="dialog">
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="dialog-header-title">
          <div class="dialog-title">Thông tin nhân viên</div>
          <div class="type-select">
            <input type="checkbox" />
            <div style="margin-left: 10px">Là Khách hàng</div>
          </div>
          <div class="type-select">
            <input type="checkbox" />
            <div style="margin-left: 10px">Là nhà cung cấp</div>
          </div>
        </div>
        <div class="dialog-header-btn">
          <div class="help-btn"></div>
          <div class="close-btn" @click="closeDialog"></div>
        </div>
      </div>
      <div class="dialog-main-content">
        <div class="group-input-1">
          <div class="group-input-left">
            <div class="row-input input-space">
              <div class="input-code">
                <div class="label-input">
                  Mã <span style="color: red">*</span>
                </div>
                <input
                  v-model="employeeInDialog.EmployeeCode"
                  ref="inputCode"
                  type="text"
                  style="padding: 6px 10px; width: 150px; box-sizing: border-box;"
                />
              </div>
              <div class="input-name" style="margin-left: 6px">
                <div class="label-input">
                  Tên <span style="color: red">*</span>
                </div>
                <input 
                v-model="employeeInDialog.FullName"
                type="text" 
                style="padding: 6px 10px; width: 235px" />
              </div>
            </div>
            <div style="box-sizing: borderbox; padding-bottom: 12px">
              <div class="label-input">
                Đơn vị <span style="color: red">*</span>
              </div>
              <Combobox   
              :deparmentName="employeeInDialog.DepartmentName"
              />
            </div>
            <div>
              <div class="label-input">Chức danh</div>
              <input
              v-model="employeeInDialog.PositionName" 
              type="text" style="padding: 6px 10px; width: 100%" />
            </div>
          </div>
          <div class="group-input-right">
            <div class="row-input input-space">
              <div class="input-date">
                <div class="label-input">Ngày sinh</div>  
                <input
                  :value="employeeInDialog.DateOfBirth"
                  ref="inputDateOfBirth"
                  @input="onInputDateInput($event)"
                  type="text"
                  style="padding: 6px 10px; width: 161px"
                  placeholder="DD/MM/YYYY"
                />
              </div>
              <div class="input-name">
                <div class="label-input">Giới tính</div>
                <div
                id="v-model-radiobutton" 
                style="margin-top: 8px; display: flex; font-size: 13px">
                  <div>
                    <input type="radio" value="0" id="male" name="radio-group" 
                    v-model="employeeInDialog.Gender"/>
                    <label for="male">Nam</label>
                  </div>
                  <div>
                    <input type="radio" value="1" id="female" name="radio-group" 
                    v-model="employeeInDialog.Gender"/>
                    <label for="female">Nữ</label>
                  </div>
                  <div>
                    <input type="radio" value="2" id="another" name="radio-group" 
                    v-model="employeeInDialog.Gender"/>
                    <label for="another">Khác</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row-input input-space">
              <div style="padding-right: 6px">
                <div class="label-input">Số CMTND</div>
                <input 
                v-model="employeeInDialog.IdentityNumber"
                type="text" style="padding: 6px 10px; width: 245px" />
              </div>
              <div>
                <div class="label-input">Ngày cấp</div>
                <input
                  ref="inputIdentityDate"
                  :value="employeeInDialog.IdentityDate"
                  @input="onInputIdentityDate($event)"
                  type="text"
                  style="padding: 6px 10px; width: 161px"
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>
            <div>
              <div class="label-input">Nơi cấp</div>
              <input 
              v-model="employeeInDialog.IdentityPlace"
              type="text" style="padding: 6px 10px; width: 100%" />
            </div>
          </div>
        </div>
        <div class="group-input-2">
          <div class="input-space">
            <div class="label-input">Địa chỉ</div>
            <input
            v-model="employeeInDialog.Address"
             type="text" style="width: 100%" />
          </div>
          <div class="input-space row-input">
            <div style="margin-right: 6px">
              <div class="label-input">ĐT di động</div>
              <input
              v-model="employeeInDialog.MobilePhoneNumber"
               type="text" style="width: " />
            </div>
            <div style="margin-right: 6px">
              <div class="label-input">ĐT cố định</div>
              <input 
              v-model="employeeInDialog.TelePhoneNumber"
              type="text" style="width: " />
            </div>
            <div style="margin-right: 6px">
              <div class="label-input">Email</div>
              <input
              v-model="employeeInDialog.Email"
               type="text" style="width: " />
            </div>
          </div>
          <div class="input-space row-input">
            <div style="margin-right: 6px">
              <div class="label-input">Tài khoản ngân hàng</div>
              <input
              v-model="employeeInDialog.BankAccountNumber"
               type="text" style="width: " />
            </div>
            <div style="margin-right: 6px">
              <div class="label-input">Tên ngân hàng</div>
              <input
              v-model="employeeInDialog.BankName"
               type="text" style="width: " />
            </div>
            <div style="margin-right: 6px">
              <div class="label-input">Chi nhánh</div>
              <input
              v-model="employeeInDialog.BankBranch"
               type="text" style="width: " />
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <div class="footer-btn">
            <BaseButton :buttonInfor="cancelButtonInfor" @clickFunction="closeDialog" />
            <div class="footer-btn-container">
              <BaseButton
                style="margin-right: 10px"
                @clickFunction="onSaveClick"
                :buttonInfor="saveButtonInfor"
              />
              <BaseButton :buttonInfor="saveAndAddButtonInfor" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <PopupEmpty
      @closeEmptyPopup="closeEmptyPopup"
      :emptyField="emptyField"
      v-show="isShowEmptyPopup"
    />
    <PopupInforChange
      @closePopup="closeInforChangePopup"
      v-show="isShowInforChangePopup"
    />
  </div>
</template>
<script>
import PopupEmpty from "../components/popup/PopupEmpty.vue";
import BaseButton from "../components/Button.vue";
import PopupInforChange from "../components/popup/PopupInforChange.vue";
import Combobox from "../components/Combobox.vue";
import EmployeeModel from "../models/EmployeeModel.js"
import Format from "../../src/assets/utils/common/Format.js"
import EmployeeApi from "../../src/api/component/EmployeeApi"
export default {
  components: {
    BaseButton,
    PopupEmpty,
    PopupInforChange,
    Combobox,
  },

  props:{
    dialogMode: {
      type: Number,
      require: true,
    },
    employee: {
      type: Object,
      require: true,
    } 
  },

  created() {},

  methods: {

    onSaveClick(){
      if(this.dialogMode == 0 || this.dialogMode == 2){
        if(this.employeeInDialog.DateOfBirth != null){
          this.employeeInDialog.DateOfBirth = Format.dobFormatToAdd(this.employeeInDialog.DateOfBirth);
        }
        if(this.employeeInDialog.IdentityDate != null){
          this.employeeInDialog.IdentityDate = Format.dobFormatToAdd(this.employeeInDialog.IdentityDate);
        }
        EmployeeApi.add(this.employeeInDialog)
                  .then(() =>{
                    alert('thêm mới thành công')
                    this.closeDialog();
                  }).catch(err =>{
                    alert('thêm mới thất bại')
                    console.log(err);
                  })
      }
      else{
        alert("Sửa");
      }
    },

    /**
     * Xứ lí sự kiện khi click vào nút đóng dialog, emit lên component cha
     * created by: NHNGHIA (30/8/2021)
     */
    closeDialog() {
      this.$emit("closeDialog");
    },

    /**
     * Forcus vào ô input đầu tiên của dialog
     * created by: NHNGHIA (30/08/2021)
     */
    forcusFirstInput() {
      this.$nextTick(() => {
        this.$refs.inputCode.focus();
      });
    },

    /**
     * Đóng popup cảnh báo các trường bị trống
     * created by: NHNGHIA (30/08/2021)
     */
    closeEmptyPopup() {
      this.isShowEmptyPopup = false;
    },

    /**
     * Đóng popup thông tin đã bị thay đổi
     * created by: NHNGHIA (30/08/2021)
     */
    closeInforChangePopup() {
      this.isShowInforChangePopup = false;
    },

    getIndexOfDateOfBirth() {
      for (let i = 0; i < 10; i++) {
        if (this.dateOfBirth[i] == "_") {
          return i;
        }
      }
      return -1;
    },


    /**
     * đưa biến dateOfBirth về dạng string
     * created by: NHNGHIA (08/30/2021)
     */
    toStringDateOfBirth() {
      var stringDob = "";
      for (let i = 0; i < 10; i++) {
        stringDob += this.dateOfBirth[i];
      }
      return stringDob;
    },

    /**
     * Bắt sự kiện thay đổi dữ liệu của ô input ngày sinh
     * created by: NHNGHIA (30/08/2021)
     * param (e): kiểu sự kiện khi thay đổi
     */
    onInputDateInput(e) {
      if (e.inputType != "deleteContentBackward") {
        var flagIndex = true;
        var valueInput = this.$refs.inputDateOfBirth.value;
        var index = this.getIndexOfDateOfBirth();
        if (index != -1) {
          var lastInput = valueInput.substr(index, 1);
          if (!isNaN(lastInput)) {
            switch (index) {
              case 1:
              case 6:
              case 7:
              case 8:
              case 9:
                this.dateOfBirth[index] = valueInput.substr(index, 1);
                break;

              case 0:
                if (parseInt(lastInput) < 4) {
                  this.dateOfBirth[index] = lastInput;
                } else {
                  flagIndex = false;
                }
                break;
              case 3:
                if (parseInt(lastInput) < 2) {
                  this.dateOfBirth[index] = lastInput;
                } else {
                  flagIndex = false;
                }
                break;
              case 4:
                if (
                  (this.dateOfBirth[index - 1] == 0 &&
                    parseInt(lastInput) != 0) ||
                  (this.dateOfBirth[index - 1] == 1 && parseInt(lastInput) < 3)
                ) {
                  this.dateOfBirth[index] = lastInput;
                } else {
                  flagIndex = false;
                }
                break;
              default:
                break;
            }
            this.$refs.inputDateOfBirth.value = this.toStringDateOfBirth();
            if (flagIndex) {
              index++;
            }
            if (index == 2 || index == 5) {
              index++;
            }
            this.$refs.inputDateOfBirth.setSelectionRange(index, index);
          } else {
            this.$refs.inputDateOfBirth.value = this.toStringDateOfBirth();
          }
        } else {
          this.$refs.inputDateOfBirth.value = this.toStringDateOfBirth();
        }
        flagIndex = true;
      }
      else{
        var indexDelete = this.getIndexOfDateOfBirth();
        if(indexDelete == -1){
          indexDelete = 10;
        }
        indexDelete--;
        if(indexDelete == 5 || indexDelete ==2){
          indexDelete--;
        }
        this.dateOfBirth[indexDelete] = '_';
        this.$refs.inputDateOfBirth.value = this.toStringDateOfBirth();
        this.$refs.inputDateOfBirth.setSelectionRange(indexDelete, indexDelete);
      }
    },

    getIndexOfIdentityDate(){
      for (let i = 0; i < 10; i++) {
        if (this.identityDate[i] == "_") {
          return i;
        }
      }
      return -1;
    },

    toStringIdentityDate(){
      var sidentityDate = "";
      for (let i = 0; i < 10; i++) {
        sidentityDate += this.identityDate[i];
      }
      return sidentityDate;
    },

    onInputIdentityDate(e){
      if (e.inputType != "deleteContentBackward") {
        var flagIndex = true;
        var valueInput = this.$refs.inputIdentityDate.value;
        var index = this.getIndexOfIdentityDate();
        if (index != -1) {
          var lastInput = valueInput.substr(index, 1);
          if (!isNaN(lastInput)) {
            switch (index) {
              case 1:
              case 6:
              case 7:
              case 8:
              case 9:
                this.identityDate[index] = valueInput.substr(index, 1);
                break;

              case 0:
                if (parseInt(lastInput) < 4) {
                  this.identityDate[index] = lastInput;
                } else {
                  flagIndex = false;
                }
                break;
              case 3:
                if (parseInt(lastInput) < 2) {
                  this.identityDate[index] = lastInput;
                } else {
                  flagIndex = false;
                }
                break;
              case 4:
                if (
                  (this.identityDate[index - 1] == 0 &&
                    parseInt(lastInput) != 0) ||
                  (this.identityDate[index - 1] == 1 && parseInt(lastInput) < 3)
                ) {
                  this.identityDate[index] = lastInput;
                } else {
                  flagIndex = false;
                }
                break;
              default:
                break;
            }
            this.$refs.inputIdentityDate.value = this.toStringIdentityDate();
            if (flagIndex) {
              index++;
            }
            if (index == 2 || index == 5) {
              index++;
            }
            this.$refs.inputIdentityDate.setSelectionRange(index, index);
          } else {
            this.$refs.inputIdentityDate.value = this.toStringIdentityDate();
          }
        } else {
          this.$refs.inputIdentityDate.value = this.toStringIdentityDate();
        }
        flagIndex = true;
      }
      else{
        var indexDelete = this.getIndexOfIdentityDate();
        if(indexDelete == -1){
          indexDelete = 10;
        }
        indexDelete--;
        if(indexDelete == 5 || indexDelete ==2){
          indexDelete--;
        }
        this.identityDate[indexDelete] = '_';
        this.$refs.inputIdentityDate.value = this.toStringIdentityDate();
        this.$refs.inputIdentityDate.setSelectionRange(indexDelete, indexDelete);
      }
    }
  },

  watch:{
    dateOfBirth:{
      deep: true,
      handler: function () {
        this.employeeInDialog.DateOfBirth = this.toStringDateOfBirth();
        }
      },
      identityDate:{
      deep: true,
      handler: function () {
        this.employeeInDialog.IdentityDate = this.toStringIdentityDate();
        }
      },

    dialogMode: function(val){
      if(val == 1){
       this.employeeInDialog = this.employee;
       this.employeeInDialog.DateOfBirth = Format.dobFormat(this.employee.DateOfBirth);
       this.employeeInDialog.IdentityDate = Format.dobFormat(this.employee.IdentityDate);
      }
      else if(val == 0){
        this.employeeInDialog = EmployeeModel.newEmployee();
        console.log(this.employeeEmpty);
        EmployeeApi.getNewCode().then(res =>{
          this.employeeInDialog.EmployeeCode = res.data;
        })
      }
      else if(val == 2){
        this.employeeInDialog = this.employee;
        this.employeeInDialog.DateOfBirth = Format.dobFormat(this.employee.DateOfBirth);
       this.employeeInDialog.IdentityDate = Format.dobFormat(this.employee.IdentityDate);
        EmployeeApi.getNewCode().then(res =>{
          this.employeeInDialog.EmployeeCode = res.data;
        })
      }
    }
  },

  data() {
    return {
      identityDate: {
        0: "_",
        1: "_",
        2: "/",
        3: "_",
        4: "_",
        5: "/",
        6: "_",
        7: "_",
        8: "_",
        9: "_",
      },
      dateOfBirth: {
        0: "_",
        1: "_",
        2: "/",
        3: "_",
        4: "_",
        5: "/",
        6: "_",
        7: "_",
        8: "_",
        9: "_",
      },
      employeeEmpty: EmployeeModel.newEmployee(),
      employeeInDialog: EmployeeModel.newEmployee(),
      employeeToAdd: EmployeeModel.newEmployee(),
      emptyField: "",
      isShowEmptyPopup: false,
      isShowInforChangePopup: false,
      saveAndAddButtonInfor: {
        buttonTitle: "Cất và Thêm",
        isPrimaryButton: true,
      },
      saveButtonInfor: {
        buttonTitle: "Cất",
        isSecondaryButton: true,
      },
      cancelButtonInfor: {
        buttonTitle: "Hủy",
        isSecondaryButton: true,
      },
    };
  },
};
</script>

<style scoped>
@import url("../assets/css/layout/EmployeeDialog.css");
</style>