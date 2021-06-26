var moment = require('moment');
import { Tag, Button } from 'antd';
import React, { Component } from 'react';

class Defaults {

    times = [
        "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03.30", "04.00", "04.30", "05.00", "05.30", "06.00", "06.30", "07.00", "07.30", "08.00", "08.30", "09.00", "09.30", "10.00", "10.30", "11.00", "11.30", "12.00", "12.30", "13.00", "13.30", "14.00", "14.30", "15.00", "15.30", "16.00", "16.30", "17.00", "17.30", "18.00", "18.30", "19.00", "19.30", "20.00", "20.30", "21.00", "21.30", "22.00", "22.30", "23.00", "23.30"
    ]

    getStatus(id) {
        if (id == 1) {
            return <Tag color="cyan">Live</Tag>;
        } else if (id == 3) {
            return <Tag color="geekblue">Archive</Tag>;
        } else if (id == 4) {
            return <Tag color="magenta">Pause</Tag>;
        } 
    }

    formatData(data) {
        var res = data.replace(/[\"\:\]\\n\[]/g, "").split(",");
        return res;
    }

    getColour(id) {
        if (id == 1) {
            return '#108ee9'; 
        } else if (id == 0) {
            return 'blue';
        }
    }

    dateFromUnix(unix_time) {
        // Months array
        var months_arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        // Convert timestamp to milliseconds
        var date = new Date(unix_time * 1000);
        // Year
        var year = date.getFullYear();
        // Month
        var month = months_arr[date.getMonth()];
        // Day
        var day = date.getDate();
        // Display date time in yyyy MM DD
        var convdatedTime = year + '-' + month + '-' + day;
        return convdatedTime;
    }

    timeFromUnix(unix_time) {
        // Convert timestamp to milliseconds
        var date = new Date(unix_time * 1000);
        // Hours
        var hours = date.getHours();
        // Minutes
        var minutes = "0" + date.getMinutes();
        // Display date time in h:m format
        var convdatedTime = convdatedTime = hours + ':' + minutes.substr(-2);

        return convdatedTime;
    }

    dateTimeFromUnix(unix_time) {
        // Months array
        var months_arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        // Convert timestamp to milliseconds
        var date = new Date(unix_time * 1000);
        // Year
        var year = date.getFullYear();
        // Month
        var month = months_arr[date.getMonth()];
        // Day
        var day = date.getDate();
        // Convert timestamp to milliseconds
        var date = new Date(unix_time * 1000);
        // Hours
        var hours = date.getHours();
        // Minutes
        var minutes = "0" + date.getMinutes();
        // Display date time in yyyy MM DD h:m format
        var convdatedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2);
        return convdatedTime;
    }

    normalDateToUnix(data) {
        // return new Date(data).getTime() / 1000;
        return 1234567890;
    }

    getDiscount(price, discount) {
        var dis_price = price * ((100 - discount) / 100);
        return dis_price;
    }

    getPrice(price, discount) {
        var dis_price = price - (price * (discount / 100));
        return dis_price;
    }

    changeJSONFormat(obj) {
        var newObj = [];
        obj.map((item, index) => (
            newObj.push({ "uid": item.rowid, "url": item.thumb })
        ))
        return newObj;
    }

    getCurrentDate() {
        return Math.round((new Date()).getTime() / 1000);
    }

    getRedemptionStatus(status) {
        if (status == 0) {
            return <Tag color="#ffff00">Cancelled</Tag>;
        } else if (status == 1) {
            return <Tag color="#108ee9">Redeemed</Tag>;
        } else if (status == 2) {
            return <Tag color="#87d068">Purchased</Tag>;
        } else if (status == 3) {
            return <Tag color="#f50">Expired</Tag>;
        } else if (status == 4) {
            return <Tag color="#f50">Expired</Tag>;
        }
    }

}
export default new Defaults();