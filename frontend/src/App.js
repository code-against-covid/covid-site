import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Drawer from './components/Drawer/Drawer';
import Form from './components/form/Form'
import Organization from './components/organization/Organization'
import News from './components/news/News'

const App = () =>
{
  return (
    <>
      <div className="app">
        <Drawer />
      <Form/>
       <News/>
          <Organization/>
        <Footer />
</div>
    </>
  );
}

export default App;
