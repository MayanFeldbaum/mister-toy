import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './views/home-page';

function App() {
  return (
    // <Provider store={store}>
    <Router>
      {/* <section className="main-layout app"> */}
      {/* <AppHeader /> */}
      <main>
        <Routes>
          <Route element={<HomePage />} path="/" />
          {/* <Route element={<AboutUs />} path="/about" /> */}
          {/* <Route element={<CarIndex />} path="/car" /> */}

        </Routes>
      </main>
      {/* <AppFooter /> */}
      {/* </section> */}
    </Router>
    // </Provider>
  )
}

export default App;
