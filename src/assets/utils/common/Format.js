class Format{


    /**---------------------------------------------------------
    * Format ngày tháng năm sinh từ bảng vào form sửa thông tin
    * @param {date} dob 
    * @returns 
    */
     dobFormatToAdd(dob) {
        if (dob != null) {
            var date = new Date(dob);
            var day = date.getDate();
            var mon = date.getMonth() + 1;
            var year = date.getFullYear();
            day = day < 10 ? '0' + day : day;
            mon = mon < 10 ? '0' + mon : mon;
            return year + '-' + mon + '-' + day;
        } else return null;
    }

    /**------------------------------------------------
    * Format ngày tháng năm sinh thành dạng dd/mm/yyyy
    * @param {any} dob tham số có kiểu dữ liệu bất kì
    * @returns 
    * created by: NHNGHIA (19/7/2021)
    */
     dobFormat(dob) {
        if (dob != null) {
            var date = new Date(dob);
            var day = date.getDate();
            var mon = date.getMonth() + 1;
            var year = date.getFullYear();
            day = day < 10 ? '0' + day : day;
            mon = mon < 10 ? '0' + mon : mon;
            return day + '/' + mon + '/' + year;
        } else return null;
    }


    /**
     * Format giới tính theo mã
     * @param {int} gender 
     * @returns Tên giới tính theo mã
     */
    genderFormat(gender){
        var genderName;
        switch (gender) {
            case 0:
                genderName = "Nam";
                break;
            case 1: 
                genderName = "Nữ";
                break;
            case 2:
                genderName = "Giới tính khác";
                break;
            default:
                break;
        }
        return genderName;
    }
}

export default new Format();