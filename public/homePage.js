"use strict";

const { response } = require("express");
const morgan = require("morgan");
//Выход из личного кабинета
const logOuting = new LogoutButton();
logOuting.action = data => {
    ApiConnector.logout(response => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            response.error;
        }
    })
};
//Получение информации о пользователе
ApiConnector.current( response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        response.error;
    }
});
//Получение текущих курсов валюты
// Connection of our new object of RatesBoard with func getCurr??
const currency = new RatesBoard();
function getCurr(){
    ApiConnector.getStocks( response => {
    if (response.success) {
        clearTable();
        fillTable(response.data);
    } else {
        response.error;
    }
});
};
setInterval(getCurr, 1000);

//Операции с деньгами
//пополнение баланса
const managment = new MoneyManager();
managment.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            this.setMessage(response.success, response.error);
        } else {
            response.error;
        }
    })
}
//Конвертирование валюты
managment.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            this.setMessage(response.success, response.error);
        } else {
            response.error;
        }
    })
};
//перевод валюты
managment.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            this.setMessage(response.success, response.error);
        } else {
            response.error;
        }
    })
}
const favorites = new FavoritesWidget();
//начальный список избранного
//Таким образом запрос просто выполняется? а не записывается в функцию, что выполняет запрос
// Как понять, что именно будет в response
    ApiConnector.getFavorites(response => {
        if (response.success){
            this.clearTable();
        } else {
            response.error;
        }
        fillTable(response.data);
        updateUsersList(response.data);
});
//добавления пользователя в список избранных
favorites.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response =>{
        if (response.success){
            this.clearTable();
        } else {
            this.setMessage(response.success, response.error);
        }
        fillTable(data);
        updateUsersList(data);
    });
}
//удаление пользователя из избранного
favorites.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response =>{
        if (response.success){
            this.clearTable();
        } else {
            this.setMessage(response.success, response.error);
        }
        fillTable(data);
        updateUsersList(data);
    });
}