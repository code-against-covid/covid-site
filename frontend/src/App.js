import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Drawer from './components/Drawer/Drawer';
import Form from './components/form/Form'
import Organization from './components/organization/Organization'
import Initiative from './components/news/News'

const App = () =>
{
  return (
    <main>
      <div className="app">
        <Drawer />
        <Form />
        <Initiative />
        <Organization />
        <Footer />
      </div>
    </main>
  );
}

export default App;
