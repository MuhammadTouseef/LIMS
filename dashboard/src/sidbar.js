import 'react-bootstrap-drawer/lib/style.css';
import React, { useState } from 'react';
import {
	Col,
	Collapse,
	Container,
	Row,
} from 'react-bootstrap';
import { Drawer, } from 'react-bootstrap-drawer';

const ApplicationDrawer = (props) => {
	const [open, setOpen] = useState(false);

	const handleToggle = () => setOpen(!open);

	return (
		<Drawer { ...props }>
			<Drawer.Toggle onClick={ handleToggle } />

			<Collapse in={ open }>
				<Drawer.Overflow>
					<Drawer.ToC>
						<Drawer.Header href="/">LIMS</Drawer.Header>

						<Drawer.Nav>
							<Drawer.Item href="/settings">Settings</Drawer.Item>
						</Drawer.Nav>
					</Drawer.ToC>
				</Drawer.Overflow>
			</Collapse>
		</Drawer>
	);
};

const Application = (props) => {
	return (
		<Container fluid>
			<Row className="flex-xl-nowrap">
				<Col as={ ApplicationDrawer } xs={ 12 } md={ 3 } lg={ 2 } />
				<Col xs={ 12 } md={ 9 } lg={ 10 }>{ props.children }
        
                </Col>
			</Row>
		</Container>
	);
};
export default Application;

