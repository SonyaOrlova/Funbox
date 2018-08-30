import React, {Component} from 'react';
import Form from './Form';
import List from './List';
import YaMap from './YaMap';

class App extends Component {

  render() {
    return (
      <div>

        <header className = 'header'>
          <div className = 'header__logo'>
            <img src = 'images/logo.png' width = '47' height = '87' alt = 'Логотип FunBox' />
          </div>
          <p className = 'header__description'>Квалификационное задание для разработчиков <span>Java Script</span></p>
        </header>

        <main className = 'main'>
          <div className = 'main__wrapper'>
            <Form />
            <List />
          </div>
          <YaMap />
        </main>

        <footer className = 'footer'>
          <div className = 'footer__wrapper'>
            <div className = 'footer__contacts'>
              <a className = 'social__link social__link--mail' href='mailto:sonya5488@yandex.ru'>
                <img src = 'images/mail.png' width = '35' height = '35' alt = 'Почта Орловой С.' />
              </a>
              <a className = 'social__link social__link--github' href = 'https://github.com/SonyaOrlova'>
                <img src = 'images/mark-github.png' width = '35' height = '35' alt = 'Логотип Github' />
              </a>
              <a className = 'social__link social__link--hh' href = 'https://hh.ru/resume/993bbe44ff007270d20039ed1f736563726574'>
                <img src = 'images/mark-hh.png' width = '35' height = '35' alt = 'Логотип HeadHunter' />
              </a>
            </div>
          </div>
        </footer>

      </div>
    );
  }
};

export default App;

