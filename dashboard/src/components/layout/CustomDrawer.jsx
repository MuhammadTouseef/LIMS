import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import {
	Drawer,
	DrawerOverflow,
	DrawerToC,
	DrawerToggle,
} from 'react-bootstrap-drawer';

import { Dashnav } from '../navigation/Dashnav';



export const CustomDrawer = (props) => {
	const [open, setOpen] = useState(false);

	const handleToggle = () => setOpen(!open);

	return (
		<Drawer className={ `text-light ${ props.className } `} style={{background: "url(https://nccfsl.org.ng/customer-dashboard/assets/images/bg-themes/3.png)"}} >
			<DrawerToggle onClick={ handleToggle } />

			<Collapse in={ open }>
				<DrawerOverflow>
					<DrawerToC>				
				
                        <Dashnav/>
					</DrawerToC>
				</DrawerOverflow>
			</Collapse>
		</Drawer>
	);
};