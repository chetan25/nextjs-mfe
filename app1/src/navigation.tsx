import React, { useState, useEffect} from 'react';
import {
    Link,
    useLocation
  } from "react-router-dom";
import { Menu } from 'semantic-ui-react';

const routesMap: Record<string, string> = {
    '/': 'home',
    '/user': 'user',
    '/admin': 'admin'
}

const Navigation = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('home');

    useEffect(() => {
        const activeEl = routesMap[location.pathname] || 'home';
        setActiveItem(activeEl);
        console.log(activeEl);
    }, [location]);

    return (
        <>
            <nav>
                <Menu pointing> 
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                    ><Link to="/">About Home</Link></Menu.Item>   
                    <Menu.Item
                        name='user'
                        active={activeItem === 'user'}
                    ><Link to="/user">About User</Link></Menu.Item>
                    <Menu.Item
                        name='admin'
                        active={activeItem === 'admin'}
                    ><Link to="/admin">About Admin</Link></Menu.Item>
                </Menu> 
            </nav>
        </>
    )
}

export default Navigation;