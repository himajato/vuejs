<template>
  <div class="table-content">
    <div class="table-function">
      <div class="filter-refresh-export">
        <div class="input-search">
          <input
            style="width: 240px"
            placeholder="Tìm theo mã, tên nhân viên"
          />
          <div class="icon-search"></div>
        </div>
        <div class="refresh-button-container">
          <div
          @click="onRefreshClick"
           class="refresh-button"></div>
        </div>
        <div class="export-btn"></div>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr style="height: 34px">
            <th class="empty-row"></th>
            <th class="th-checkbox col-checkbox">
                <input type="checkbox">
            </th>
            <th class="col-code">MÃ NHÂN VIÊN</th>
            <th class="col-name">TÊN NHÂN VIÊN</th>
            <th style="width: 105px">GIỚI TÍNH</th>
            <th>NGÀY SINH</th>
            <th>Số CMTND</th>
            <th>Chức Danh</th>
            <th>Tên đơn vị</th>
            <th>Số tài khoản</th>
            <th>Tên ngân hàng</th>
            <th>Chi nhánh ngân hàng</th>
            <th class="col-function th-col">Chức năng</th>
            <th class="last-col"></th>
          </tr>
        </thead>
        <tbody>
          <tr 
          v-for="employee in employees" :key="employee.EmployeeId"
          @dblclick="getEmployeeIdUpdate(employee.EmployeeId)">
            <td class="empty-row"></td>
            <td class="col-checkbox">
                <input type="checkbox">
            </td>
            <td class="col-code">{{employee.EmployeeCode}}</td>
            <td class="col-name">{{employee.FullName}}</td>
            <td>{{employee.Gender}}</td>
            <td>{{employee.DateOfBirth}}</td>
            <td>{{employee.IdentityNumber}}</td>
            <td>{{employee.PositionName}}</td>
            <td>{{employee.DepartmentName}}</td>
            <td>{{employee.BankAccountNumber}}</td>
            <td>{{employee.BankName}}</td>
            <td>{{employee.BankBranch}}</td>
            <td class="col-function td-function">
              <div 
              @click="getEmployeeIdUpdate(employee.EmployeeId)"
              style="margin-right: 8px; cursor: pointer;">Sửa</div>
              <div class="drop-function" @click="getPosition($event,employee)"></div>
            </td>
            <td class="last-col"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paging-bar">
      <div class="total-record">
        <p>Tổng số<span style="font-weight: bold">: {{totalRecord}}</span> bản ghi</p>
      </div>
     <div class="pagin-container"> 
        <Dropdown
        @selectRecordPerPage="getDataPaging"
        style="margin-right: 20px"
        />
        <b-pagination
        limit = 4
        prev-text = "Trước"
        next-text = "Sau"
        v-model="currentPage"
        :total-rows="totalPage - 1"
        :per-page="perPage"
        first-number
        last-number
      ></b-pagination>
     </div>
    </div>
  </div>
</template>

<script>

import Dropdown from "../../../components/Dropdown.vue"
//import EmployeeApi from "../../../api/component/EmployeeApi.js"
export default {
  created(){
    },

  props:{
    totalPage:{
       type: Number,
      require: true,
    },
    totalRecord:{
      type: Number,
      require: true,
    },
    employees: {
      type: Array,
      require: true,
    }
  },
  components: {
    Dropdown,
  },

  watch:{
    currentPage: function (val) {
      this.$emit("currentPage",val);
    }
  },

  methods:{
    getEmployeeIdUpdate(id){
      this.$emit("getEmployeeIdUpdate", id);
    },

    getDataPaging(count){
      this.$emit("getDataPaging", count);
    },

    onRefreshClick(){
      this.$emit('onRefreshClick');
    },

    setCurrentPage(number){
      this.currentPage = number;
    },

    getPosition(e,employee){
      this.$emit("getPosition",e.x , e.y,employee.EmployeeId);
    }
  },
  data(){
    return{
      perPage: 1,
      currentPage: 1,
    }
  }
};
</script>

<style>
@import url("../../css/layout/TableContent.css");
</style>