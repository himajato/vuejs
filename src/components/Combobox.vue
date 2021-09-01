<template>
  <div class="combobox">
    <div style="display: flex; width: 100%; align-items: center;">
      <input
        ref="inputDepartment"
        @keyup.down="onArrowKeyDownPress"
        @keydown.up="onArrowKeyUpPress"
        @keydown.tab="onTabPress"
        @keydown.enter="onItemEnter"
        @input="onComboboxInput"
        :value="inputCombobox"
        type="text"
        style="width: 100%"
      />
      <div class="btn-dropdown" @click="toggleComboboxData">
        <div class="dropdown-icon"></div>
      </div>
    </div>
    <div class="combobox-data" v-show="isShowComboboxData">
      <div class="combobox-data-header">
        <div class="item-code">Mã đơn vị</div>
        <div class="item-name">Tên đơn vị</div>
      </div>
      <div class="combobox-data-items">
        <div
          v-for="(item) in dataItems"
          :key="item.id"
          class="data-item"
          ref="dataItem"
          @click="dataItemSelect(item)"
        >
          <div class="item-code">{{ item.Code }}</div>
          <div class="item-name">{{ item.Name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.isShowComboboxData = false;
      }
    });
    this.dataItemsClone = this.dataItems;
  },

  props:{
    deparmentName:{
      type: String,
    }
  },

  methods: {
    /**
     * Bắt sự kiện khi ấn enter để chọn item trong combobox
     * created by: NHNGHIA (30/08/2021)
     */
    onItemEnter(){
        this.inputCombobox = this.$refs["dataItem"][this.indexData].childNodes[1].innerHTML;
        this.indexData = -1;
        this.isShowComboboxData = false;
        this.dataItems = this.dataItemsClone;
    },

    /**
     * Sự kiện cho nút bật tắt data combobox
     * created by: NHNGHIA (30/08/2021)
     */
    toggleComboboxData() {
      this.isShowComboboxData = !this.isShowComboboxData;
    },

    /**
     * Sự kiện click chọn vào một item trong combobox data
     * created by : NHNGHIA (30/08/2021)
     */
    dataItemSelect(item) {
      this.inputCombobox = item.Name;
      this.isShowComboboxData = false;
    },

    onComboboxInput(){
      this.indexData = -1;
      var val = this.$refs.inputDepartment.value;
      this.inputCombobox = val;
      this.isShowComboboxData = true;
      var self = this;
      this.dataFilter = [];
      if (val != "") {
        self.dataItemsClone.forEach((item) => {
          if (
            item.Name.trim().toLowerCase().includes(val.toLowerCase()) ||
            item.Code.trim().toLowerCase().includes(val.toLowerCase())
          ) {
            self.dataFilter.push(item);
          }
          self.dataItems = self.dataFilter;
        });
      } else {
        this.dataItems = this.dataItemsClone;
      }
    },

    onArrowKeyUpPress(){
      if (this.indexData == -1) {
        this.indexData = this.dataItems.length -1;
      }
      if(this.indexData <= this.dataItems.length-1){
          this.$refs["dataItem"][this.indexData].classList.remove('data-item-active');
      }
        this.isShowComboboxData = true;
        --this.indexData;
      if (this.indexData == -1) {
        this.indexData = this.dataItems.length -1;
      }
      this.$refs["dataItem"][this.indexData].classList.add('data-item-active');
    },

    /**
     * Bắt sự kiện khi bấm nút mũi tên xuống
     * created by: NHNGHIA (30/08/2021)
     */
    onArrowKeyDownPress() {
        if(this.indexData >= 0){
          this.$refs["dataItem"][this.indexData].classList.remove('data-item-active');
      }
        this.isShowComboboxData = true;
        ++this.indexData;
      if (this.indexData == this.dataItems.length) {
        this.indexData = 0;
      }

      this.$refs["dataItem"][this.indexData].classList.add('data-item-active');
    },

    /**
     * Sự kiện tab vào Combobox, hiện thị combobox data
     * created by: NHNGHIA (30/08/2021)
     */
    onTabPress() {
      if(this.inputCombobox != ''){
          this.isShowComboboxData = false;
      }
    },
  },

  watch: {
    deparmentName: function(val) {
      this.inputCombobox = val;
    },
    dataItems: function (val) {
      this.dataItems = val;
    },

  },

  data() {
    return {
      indexData: -1,
      inputCombobox: "",
      flagIsEnter: false,
      isShowComboboxData: false,
      dataItemsClone: "",
      dataFilter: [],
      dataItems: [
        {
          Id: "01",
          Code: "PB012",
          Name: "Phòng marketing",
        },
        {
          Id: "02",
          Code: "PB013",
          Name: "Phòng Nhân sự",
        },
        {
          Id: "03",
          Code: "PB014",
          Name: "Phòng Đào tạo",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url("../assets/css/component/Combobox.css");
</style>