var link = document.querySelector(".feedback-link"); // находим кнопку, вызывающая модалку, запишем в переменную
var popup = document.querySelector(".modal-feedback"); // находим модалку, запишем в переменную
var close = document.querySelector(".modal-close"); // находим крестик, закрывающий модалку, в переменную
var overlay = document.querySelector(".modal-overlay"); // находим оверлей, запишем в переменную
var form = popup.querySelector("form"); // находим форму модалки, запишем в переменную
var login = popup.querySelector("[name=login]"); // находим поле логина, запишем в переменную
var email = popup.querySelector("[name=email]"); // находим поле почты, запишем в переменную
var isStorageSupport = true; // создаем переменную поддержки локал хранилица в булевым значением да для проверки
var storage = ""; // создаем пустую переменную хранилища

try { // если пытаемся получить переменной хранилища ключ из локального хранилиза логин
  storage = localStorage.getItem("login");
} catch (err) { // а если выскакивает ошибки , выключаем поддержку локал хранилища
  isStorageSupport = false;
}

link.addEventListener("click", function(evt) { // ловим событие клика по кнопке
  evt.preventDefault(); // отменяем стандартное действие кнопки
  popup.classList.add("modal-show"); // добавляем класс с display: block в нашу модалку при клике на кнопку
  popup.classList.add("modal-animation-show");
  overlay.classList.add("modal-show"); // добавляем класс с display: block в наш оверлей при клике на кнопку
  if (storage) { // если значение существует записываем логин в соответствующее поле ввода при открытии модалки
    login.value = storage;
    email.focus(); // смещаем тогда фокус на поле ввода имэйла, если значение логина уже есть
  } else { // иначе ставим фокус в поле ввода логина при открытии модалки
    login.focus();
  }
});

close.addEventListener("click", function(evt) { // ловим событие клика по крестику
  evt.preventDefault(); // отменяем стандартное действие крестика
  popup.classList.remove("modal-show"); // удаляем класс с display: block в нашей модалке при клике на крестик
  popup.classList.remove("modal-animation-show");
  overlay.classList.remove("modal-show"); // удаляем класс с display: block в нашем рверлее при клике на крестик
  popup.classList.remove("modal-error"); // удаляем класс с анимацией в нашей модалке при клике на крестик
});

overlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-animation-show");
  overlay.classList.remove("modal-show");
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function(evt) { // отловим событие при отправки формы
  if (!login.value || !email.value) { // отмена отправки формы, если одно из полей не заполнено
    evt.preventDefault(); // отменяем стандартное событие при отправки формы
    popup.classList.remove("modal-error"); // удаляем класс с анимацией в нашей модалке при отправки формы
    popup.offsetWidth = popup.offsetWidth; // хак чтобы анимация ошибки срабатывала несколько раз если форма незаполнена
    popup.classList.add("modal-error"); // если форма незаполнена добавлем класс с анимацией в нашей модалке при отправки формы
  } else { // иначе в случае заполненной формы запишем логин пользователя в локальное хранилище
    if (isStorageSupport) { // если запись хранилища не пустая
      localStorage.setItem("login", login.value); // то установим в локальном хранилище ключ и значение
    }
  }
});

window.addEventListener("keydown", function(evt) { // отловим событие нажитие кнопки esc
  if (evt.keyCode === 27) { // условие если нажата кнопка esc через keycode
    if (popup.classList.contains("modal-show")) { // условие - если проверяем класс и он есть, то
      evt.preventDefault(); // отменяем стандартное событие при нажатии кнопки esc
      popup.classList.remove("modal-show"); // удаляем класс с display: block в нашей модалке при нажатии на esc
      popup.classList.remove("modal-animation-show");
      overlay.classList.remove("modal-show"); // удаляем класс с display: block в нашем оверлее при нажатии на esc
      popup.classList.remove("modal-error"); // удаляем класс с анимацией в нашей модалке при нажатии на esc
    }
  }
});