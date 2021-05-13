"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            response.error; // должно работать так, но в задании у callback 2 параметра 
        }
    }
    )};
userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            response.error;; // должно работать так, но в задании у callback 2 параметра 
        }
    }
    )};
 

