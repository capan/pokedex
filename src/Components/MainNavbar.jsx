import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'bootstrap/dist/css/bootstrap.min.css';


const MainNavbar = (props) => {
    let tabs = props.children.map((el, index) =>
        <Tab eventKey={props.titles[index].toLowerCase()} title={props.titles[index]}>
            {el}
        </Tab>
    )
    return (
        <Tabs defaultActiveKey={props.titles[0].toLowerCase()} id="uncontrolled-tab-example">
            {tabs}
        </Tabs>
    )
}

export default MainNavbar
