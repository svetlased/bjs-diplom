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
            managment.setMessage(response.success, response.error || "Баланс пополнен" );
    })
}
//Конвертирование валюты
managment.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
            ProfileWidget.showProfile(response.data);
            managment.setMessage(response.success, response.error || "Валюта конвертирована");
    })
};
//перевод средств
managment.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
            ProfileWidget.showProfile(response.data);
            managment.setMessage(response.success, response.error || "Средства переведены");
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
        favorites.setMessage(response.success, response.error || "Пользователь добавлен в Избранное");
        favorites.fillTable(data);
        managment.updateUsersList(data);
    });
}
//удаление пользователя из избранного
favorites.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response =>{
        favorites.clearTable();
        favorites.setMessage(response.success, response.error || "Пользователь удален из Избранного");
        favorites.fillTable(data);
        managment.updateUsersList(data);
    });
}
