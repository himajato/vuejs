<template>
    <div class="employee-page" style="position: relative">
        <div class="title-and-button">
            <div class="title">Nhân viên</div>
            <BaseButton
            style="margin-left:auto"
            @clickFunction="openDialog"
            :buttonInfor="addButtonInfor"/>
        </div>

        <TableContent
        ref="tableContent"
        @onRefreshClick="onRefreshClick"
        @getEmployeeIdUpdate="getEmployeeUpdate"
        @getDataPaging="getListBySize"
        @currentPage="getListByPage"
        @getPosition="getPosition"
        :totalRecord="totalRecord"
        :totalPage="totalPage"
        :employees="employees"/>

        <EmployeeDialog
        :dialogMode="dialogMode"
        :employee="employeeUpdate"
        ref="EmployeeDialog"
        @closeDialog="closeDialog"
        v-show="isShowDialog"/>

        <PopupWarning
        @onConfirmDeleteClick="onConfirmDeleteClick"
        :popupInfor="confirmDeletePopUp"
        v-show="isShowDeletePopup"
        @closePopup="closePopUp"/>

        <DropdownFunction
        @onCoppyClick="onCoppyClick"
        @onDeleteClick="onDeleteClick"
        :position="positionFunctionDropDown"
        ref="dropdownFunction"
        v-show="isShowDropdownFunction"/>

        <Loader
        v-show="isShowLoader"/>
    </div>
</template>

<script>
import BaseButton from "../../../components/Button.vue"
import EmployeeDialog from '../../../layout/EmployeeDialog.vue'
import TableContent from "../../page/employee/TableContent.vue"
import PopupWarning from "../../../components/popup/PopupWarning.vue"
import EmployeeApi from "../../../api/component/EmployeeApi.js"
import DropdownFunction from "../../../components/DropdownFunction.vue"
import Loader from "../../../components/Loader.vue"
import Format from "../../utils/common/Format.js"
import EmployeeModel from "../../../models/EmployeeModel.js"
export default {
    components: {
        BaseButton,
        TableContent,
        EmployeeDialog,
        PopupWarning,
        DropdownFunction,
        Loader
    },

    created(){
        //Hiện thị loadder
        this.isShowLoader = true;

        //Gọi api lấy dữ liệu theo filter và các tham số phân trang
        EmployeeApi.getFilterPaging('',0,10).
                then(res => {
                    this.isShowLoader = false;
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                })
                .catch(err => {
                    this.isShowLoader = false;
                    alert(err); 
                })
    },

    methods:{
        /**
         * Load lại bảng với 10 nhân viên một trang và offset là 0
         * created by: NHNGHIA (01/09/2021)
         */
        reloadTable(){
            this.isShowLoader = true;
            this.$refs.tableContent.setCurrentPage(1);
            EmployeeApi.getFilterPaging('',0,10).
                then(res => {
                    this.isShowLoader = false;
                    //Format dữ liệu
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                }).catch(err =>{
                    this.isShowLoader = false;
                    console.log(err);
                    this.employees = [];
            })
        },
        
        reloadPage(){
            this.isShowLoader = true;
            var offset = this.size*this.currentPage
            EmployeeApi.getFilterPaging('',offset,this.size).
                then(res => {
                    this.isShowLoader = false;
                    //Format dữ liệu
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                }).catch(err =>{
                    this.isShowLoader = false;
                    console.log(err);
                    this.employees = [];
            })
        },

        /**
         * Sự kiện nhân bản thông tin nhân viên
         * created by: NHNGHIA (01/09/2021)
         */
        onCoppyClick(){
            this.isShowDialog = true;
            this.dialogMode = 2;
            this.employeeUpdate = this.employeeDeleteOrCoppy;
            this.$refs.EmployeeDialog.forcusFirstInput();
            this.isShowDropdownFunction = false;    
        },

        /**
         * Sự kiện xóa nhân viên, hiện thị popup confirm delete
         * created by: NHNGHIA (01/09/2021)
         */
        onDeleteClick(){
            this.confirmDeletePopUp.popUpDescription = `Bạn có thực sự muốn xóa Nhân Viên <${this.employeeDeleteOrCoppy.EmployeeCode}> không?`
            this.isShowDeletePopup = true;
            this.isShowDropdownFunction = false;
        },

        /**
         * Sự kiện confirm xóa nhân viên, gọi đến api xóa
         * created by: NHNGHIA (01/09/2021)
         */
        onConfirmDeleteClick(){
            this.isShowLoader = true;
            this.isShowDeletePopup = false;
            EmployeeApi.deleteById(this.employeeDeleteOrCoppy.EmployeeId)
                        .then(() =>{
                            this.isShowLoader = false;
                            this.reloadPage();
                            alert('Xóa thành công');
                        }).catch(err =>{
                            this.isShowLoader = false;
                            this.reloadPage();
                            console.log(err);
                            alert('Xóa thất bại');
                        })
        },

        /**
         * Sự kiện ấn vào nút refresh, reload lại toàn table
         * created by: NHNGHIA (01/09/2021)
         */
        onRefreshClick(){
            this.reloadTable();
        },

        /**
         * Tùy chỉnh số lượng bản ghi một trang
         * created by: NHNGHIA (31/08/2021)
         */
        getListBySize(count){
            this.isShowLoader = true;
            this.$refs.tableContent.setCurrentPage(1);
            this.size = count;
            EmployeeApi.getFilterPaging('',0,count).
                then(res => {
                    this.isShowLoader = false;
                    //Format dữ liệu
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                })
        },

        /**
         * Thực hiện lấy dữ liệu theo các trang 
         * created by: NHNGHIA (31/08/2021)
         */
        getListByPage(currentPage){
            this.currentPage = currentPage;
            this.isShowLoader = true;
            var offSet = currentPage*this.size
            EmployeeApi.getFilterPaging('',offSet,this.size).
                then(res => {
                    this.isShowLoader = false;
                    //Format dữ liệu
                    res.data.employeeList.forEach(employee => {
                        employee.Gender = Format.genderFormat(employee.Gender);
                        employee.DateOfBirth = Format.dobFormat(employee.DateOfBirth);
                    });
                    this.employees = res.data.employeeList;
                    this.totalRecord = res.data.totalRecord;
                    this.totalPage = res.data.totalPage;
                })
        },

        /**
         * Lấy vị trí và thông tin nhân viên của sự kiện click khi ấn vào các nút cột chức năng
         */
        getPosition(x,y,employeeId){
            this.positionFunctionDropDown.top = y - 38;
            this.positionFunctionDropDown.left = x - 286; 
            this.isShowDropdownFunction = !this.isShowDropdownFunction;
            EmployeeApi.getById(employeeId).then(res =>{
                this.employeeDeleteOrCoppy = res.data;
            }).catch(err =>{
                alert('Lấy dữ liệu nhân viên thất bại')
                console.log(err)
            })
        },
        
        /**
         * Lấy dữ liệu nhân viên cần update để gán vào dialog
         * created by: NHNGHIA (01/09/2021)
         */
        getEmployeeUpdate(id){
            EmployeeApi.getById(id)
                .then(res =>{
                    this.dialogMode = 1;
                    this.isShowDialog = true;
                    this.employeeUpdate = res.data;
                    this.$refs.EmployeeDialog.forcusFirstInput();         
                })
                .catch(res =>{
                    console.log(res);
                })
        },

        /**
         * Sự kiện đóng dialog
         */
        closeDialog(){
            this.isShowDialog = false
            this.dialogMode = -1;
        },

        /**
         * Sự kiện khi click vào nút thêm mới nhân viên
         */
        openDialog(){   
            this.dialogMode = 0;
           this.isShowDialog = true;
           this.$refs.EmployeeDialog.forcusFirstInput();
        },

        /**
         * Hiện thị popup cảnh báo trước khi xóa
         */
        closePopUp(){
            this.isShowDeletePopup = false;
        },

    },

     data(){
        return{
            currentPage: 1,
            dialogMode: -1,
            isShowLoader: false,
            employeeUpdate: EmployeeModel.newEmployee(),
            employeeDeleteOrCoppy: EmployeeModel.newEmployee(),
            positionFunctionDropDown: {
                top: 0,
                left: 0,
            },
            isShowDropdownFunction: false,
            employees: [],
            totalRecord: 0,
            totalPage: 0,
            size: 10,
            isShowDeletePopup: false,
            isShowDialog : false,
            addButtonInfor:{
                buttonTitle: "Thêm mới nhân viên",
                isPrimaryButton: true,
            },
            confirmDeletePopUp:{
                popUpDescription: "",
            }
        }
    }
}
</script>