![Mesto](https://user-images.githubusercontent.com/117744283/212360087-b4714974-5d16-4209-a5b7-f61f9f5eaa1a.PNG)

# Проект "Место"

Одностраничный сайт из 4‐х блоков, проект как этап обучения для освоения работы с JavaScript. Проект представляет страницу профиля с фотографией, краткой информацией и фотографиями мест, так же реализована возможность поставить "Like" под фото. В 9-й проектной работе, добавлен новый функционал.

## Цель проекта

Освоить и применить навыки подключения JavaScript, Api, создание интерактивных кнопок и меню "popup", первый проект в обучении с использованием JavaScript.

## Как начать пользоваться проектом

Всё очень просто, клонируем репозиторий и запускаем через удобный для Вас редактор, Profit.

## Какие технологии были применены при создании проекта

* Grid layout (Создание сетки из блоков, используется в блоке elements).
* Позиционирование элементов.
* Структура файлов БЭМ и БЭМ Nested.
* Медиазапросов и брейкпоинты (@media, brakepoints) метод позволяющий установить необходимые значения для перехода сайта под разные устройства и разрешения экрана.
* Реализованы "маркеры" для ссылок на странице "при наведении" он же (:hover), с едиными параметрами opacity и transition (Блоки profile, elements).
* С помощью JavaScript реализованы функции модульного окна ("popup"), кнопки "сердечки" в описании фотографий и кнопки редактирования "Имени" и "Вида деятельности" на странице.
* Проект был собран по методике "Mobile first".
* Добавлена возможность просмотра фотографий из карточек.
![Снимок для ридми 2](https://user-images.githubusercontent.com/117744283/215109554-60c1cda1-a313-4083-9831-17bb5cd0d30c.PNG)
* Реализована функция добавления и удаление новых карточек через input.
![Снимок для ридми](https://user-images.githubusercontent.com/117744283/215109047-50d512ae-c44a-4c81-9e4a-4e85f0f3bd68.PNG)
* При загрузке страницы выполняется рендер заготовленных карточек.
* По средствам JavaScript реализована валидация инпут форм, благодаря чему появилась возможность стилизации сообщений об ошибках при заполнении.
![Снимок для П6](https://user-images.githubusercontent.com/117744283/217666906-35e2e3a3-5191-484f-ae45-02efd2308b8d.PNG)
* Обновлен функционал закрытия модульных окон ("popup") с помощью нажатия на оверлей и кнопки "ESC".
* Функция валидации перенесена в отдельный файл "FormValidator.js".
* Функция создания карточки перенесена в отдельный файл "Card.js".
* Используется модульное подключение скриптов.
* Реализовано экспортирование и импортирование между файлами js.
* Произведен рефакторинг и сборка Вебпаком, добавлены новые классы:
* класс Section, отвечает за отрисовку элементов на странице.
* класс Popup, отвечает за открытие и закрытие попапа.
* класс PopupWithImage, наследует от Popup, перезаписывает родительский open, открывает изображение карточки с подписью.
* класс PopupWithForm, содержит приватный метод _getInputValues, который собирает данные всех полей формы. Перезаписывает родительский метод setEventListeners.
Метод setEventListeners класса PopupWithForm добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы. Перезаписывает родительский метод close, при закрытии попапа форма ещё и сбрасывается.
* класс UserInfo отвечает за управление отображением информации о пользователе на странице.
* класс PopupWithSubmit представляет всплывающее окно с подтверждением удаления элемента.
* Добавлена возможность редактировать аватар пользователя на странице.
* Реализовано подключение к серверу через Api. Данные о пользователе, готовые карточки, количество лайков запрашивается с сервера.

## Настройка Вебпака включает в себя:

* две сборки: build и dev.
* Настроена минификация и транспиляция JS бабелем.
* Настроена обработка CSS.
* Настроена минификация CSS и автоматическое добавление вендорных префиксов.
* Настроена обработка изображений и шрифтов.

## Автор

* **Андрей Дремов** - *Проектная работа* - [andremoff](https://github.com/andremoff)

## Ссылка на сайт
https://andremoff.github.io/mesto/

## Благодарности

* Всем кто верил и поддерживал.
* Команде Яндекс Практикума, наставникам и кураторам.
