// Importing combination 
import React, {Component} from 'react'; 
// Importing Module 
import ReactDOM from 'react-dom'; 
import ChangeColor from './comp1'; 
// Importing CSS 
import './index.css'; 

class App extends Component { 
	render() 
	{ 
		return (<div><h2>Welcome to</h2> 
		<ChangeColor title="GeeksforGeeks" /></div>); 
	} 
} 

ReactDOM.render( 
<App/>, 
document.getElementById('root') 
); 
