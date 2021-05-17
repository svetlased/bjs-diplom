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
        currency.clearTable();
        currency.fillTable(response.data);
});
};
setInterval(getCurr, 1000);

//Операции с деньгами
//пополнение баланса
const managment = new MoneyManager();
managment.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
            ProfileWidget.showProfile(response.data);
            managment.setMessage(response.success, "Баланс пополнен" || response.error);
    })
}
//Конвертирование валюты
managment.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
            ProfileWidget.showProfile(response.data);
            managment.setMessage(response.success, "Валюта конвертирована" || response.error);
    })
};
//перевод средств
managment.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
            ProfileWidget.showProfile(response.data);
            managment.setMessage(response.success, "Средства переведены" || response.error);
    })
}
const favorites = new FavoritesWidget();
//начальный список избранного
    ApiConnector.getFavorites(response => {
        favorites.clearTable();
        favorites.fillTable(response.data);
        managment.updateUsersList(response.data);
});
//добавления пользователя в список избранных
favorites.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        favorites.clearTable();
        favorites.setMessage(response.success, "Пользователь добавлен в Избранное" || response.error);
        favorites.fillTable(data);
        managment.updateUsersList(data);
    });
}
//удаление пользователя из избранного
favorites.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response =>{
        favorites.clearTable();
        favorites.setMessage(response.success, "Пользователь удален из Избранного" || response.error);
        favorites.fillTable(data);
        managment.updateUsersList(data);
    });
}
