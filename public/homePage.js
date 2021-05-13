"use strict";

const { response } = require("express");

const logOuting = new LogoutButton();
logOuting.action = data => {
    ApiConnector.logout(response => {
        console.log(response);
        if (response.success) {
            location.reload();
        } 
    })
};
ApiConnector.current( response => {
    if (response.success) {
        ProfileWidget.showProfile(response.showProfile)
    }
})