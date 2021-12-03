// CustomNavigation.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import {
	DrawerNavigationHeader,
	DrawerNavigation,
} from 'react-bootstrap-drawer';

export const Dashnav = (props) => {
	return (
		<>
			<DrawerNavigationHeader href="/">
                <h1 className="text-light">
                    LIMS
                </h1>
            </DrawerNavigationHeader>

			<DrawerNavigation>
				
				<Nav.Item style={nvst} >
					<Nav.Link href="/home" className="text-light" >Home</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link href="/settings" className="text-light">Settings</Nav.Link>
					
				</Nav.Item>
				
			</DrawerNavigation>
   
		</>
	);
};
const nvst = {
color:"white",

}