import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './views/home-page'
import { ToyIndex } from './views/toy-index'
import { AboutUs } from './views/about-us'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToyEdit } from './views/toy-edit';
import { ToyDetails } from './views/toy-details';


function App() {
  return (
    <Provider store={store}>
    <Router>
      <section className="main-layout app">
        <AppHeader />
        <main>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<AboutUs />} path="/about" />
            <Route element={<ToyIndex />} path="/toy" />
            <Route element={<ToyEdit />} path="/toy/edit" />
            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
            <Route element={<ToyDetails/>} path="/toy/:toyId" />
          </Routes>
        </main>
        <AppFooter />
      </section>
    </Router >
    // </Provider>
  )
}

export default App;
