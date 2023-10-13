import {Typography } from "@mui/material";
import logo from '../assets/img/logo-blanc.png';
import AppBar from '@mui/material/AppBar';

function Header(){

    return(
        <AppBar 
            position="sticky" 
            style={{display:'flex', flexDirection:'row', alignItems: 'center', background:'#F58429'}} 
            className="appbar" >
            <Typography variant="h4" sx={{ml:2, mt:2, mb:1}}>
                <img src={logo} alt="Logo" style={{ height: "auto", width: "150px" }} />
            </Typography>
        </AppBar>
    )
}

export default Header;