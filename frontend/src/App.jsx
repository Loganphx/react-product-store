import './App.css'
import {Box, Button, useColorModeValue} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import CreatePage from "./pages/CreatePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {

    const bgColor = useColorModeValue("white", "gray.900");
    return (
    <Box bg={bgColor} width="100%" height="100%">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
      </Routes>
    </Box>
  )
}

export default App
