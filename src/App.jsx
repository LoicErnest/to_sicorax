import { useState } from 'react'
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import { ThemeProvider } from '@mui/material/styles';
import { themeBar } from "./styles/Themes";
import './styles/table.css'
import "primereact/resources/themes/lara-light-indigo/theme.css"; 

function App() {

  return (
    <ThemeProvider theme={themeBar}>
      <Header/>
      <SearchBar/>
    </ThemeProvider>
  )
}

export default App
