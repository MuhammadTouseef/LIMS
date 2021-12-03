import React from 'react';
import {
	Col,
	Container,
	Row,
} from 'react-bootstrap';
import { CustomDrawer } from './CustomDrawer';



export const Dashboard = (props) => {
	return (
		<Container fluid>
			<Row className="flex-xl-nowrap">
				<Col as={CustomDrawer} xs={ 12 } md={ 3 } lg={ 2 } />
				<Col xs={ 12 } md={ 9 } lg={ 10 }>
					{ props.children }                   
                  
				</Col>
			</Row>
		</Container>
	);
};