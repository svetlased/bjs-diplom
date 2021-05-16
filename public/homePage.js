"use strict";

//Выход из личного кабинета
new LogoutButton().action = () => ApiConnector.logout(response => location.reload());

//Получение информации о пользователе
ApiConnector.current( response => ProfileWidget.showProfile(response.data));
//Получение текущих курсов валюты
// Connection of our new object of RatesBoard with func getCurr??
const currency = new RatesBoard();
function getCurr(){
    ApiConnector.getStocks( response => {
    if (response.success) {
        currency.clearTable();
        currency.fillTable(response.data);
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
            FavoritesWidget.setMessage(response.success, response.error);
        } else {
            FavoritesWidget.setMessage(response.error);
        }
    })
}
//Конвертирование валюты
managment.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            FavoritesWidget.setMessage(response.success, response.error);
        } else {
            FavoritesWidget.setMessage(response.error);
        }  
    })
};
//перевод средств
managment.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            FavoritesWidget.setMessage(response.success, response.error);
        } else {
            FavoritesWidget.setMessage(response.error);
        }
    })
}
const favorites = new FavoritesWidget();
//начальный список избранного
//Таким образом запрос просто выполняется? а не записывается в функцию, что выполняет запрос
// Как понять, что именно будет в response
    ApiConnector.getFavorites(response => {
        if (response.success){
            favorites.clearTable();
        }
        favorites.fillTable(response.data);
        favorites.updateUsersList(response.data);
});
//добавления пользователя в список избранных
favorites.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response =>{
        if (response.success){
            RatesBoard.clearTable();
        } else {
            this.setMessage(response.success, response.error);
        }
        FavoritesWidget.fillTable(data);
        MoneyManager.updateUsersList(data);
    });
}
//удаление пользователя из избранного
favorites.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response =>{
        if (response.success){
            RatesBoard.clearTable();
        } else {
            FavoritesWidget.setMessage(response.success, response.error);
        }
        RatesBoard.fillTable(data);
        MoneyManager.updateUsersList(data);
    });
}
