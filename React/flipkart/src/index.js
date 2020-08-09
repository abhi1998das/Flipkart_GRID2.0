import React, {Component} from 'react'; 
import ReactDOM from 'react-dom'; 
import Comp1 from './comp1'; 
import Comp2 from './comp2'; 
import './index.css'; 
import problem from './img1.svg';
import solution from './img2.svg';
import performance from './img3.svg';
import Training from './img4.svg';

import Comp3 from './comp3'; 
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { FontWeights, getEdgeChromiumNoHighContrastAdjustSelector, noWrap } from '@uifabric/styling';
import {
  ActionButton,
  IButtonStyles,
  Icon,
  IIconStyles,
  Image,
  PrimaryButton,
  IconButton,
  Persona,
  Stack,
  IStackTokens,
  Text,
  ITextStyles,
  Separator,
} from 'office-ui-fabric-react';

import { Pivot,PivotItem,Label } from '@fluentui/react';

import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons(/* optional base url */);

const labelStyles= {
  root: { marginTop: 10 },
};
class App extends Component { 
  constructor() 
  { 
    super();
    
    this.state={
      value:false
       }
  } 

async componentDidMount() {
await this.getData();

}
async getData()
{
  const Insert= {"Operation":"Read","table":"Store","values":[]};
  fetch('https://localhost:44312/api/Values?data='+JSON.stringify(Insert),
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({a: 1, b: 2})
})
  .then(res => res.json())
  .then(json => this.setState({ value: json }));
}
	render() 
	{ 
		return (
      <div>
        <Image src="https://i.imgur.com/XY94LYM.jpg"  width="100%" alt="Placeholder image." />
        <div style={{position: 'absolute', top: 150, left: 120, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <h1><font  color='#f3f2f1'>Welcome</font></h1>
       </div>
       <div style={{position: 'absolute', top: 150, left: 1320, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <h1><font  color='#f3f2f1'>32 Bits</font></h1>
       </div>
      <div style={{paddingLeft:'100px',paddingTop:'20px',height:'100%'}}>
      
    <Stack horizontal>
    <Pivot aria-label="Basic Pivot Example">
      
    <PivotItem headerText="Home">
    <Stack tokens={{childrenGap:30,padding:30}}>
      <Stack horizontal tokens={{childrenGap:30,padding:30}}>
      <Image src={problem} width="50%" height="50%"/>
      <Stack tokens={{childrenGap:60}}>
      <Text variant={'xLarge'} block>Problem statement-</Text>
      <Text variant={'large'}> Some sample invoices are given  we have to convert them to computer readable format with maximum accuracy and minimum latency</Text>
      </Stack>
      </Stack>
      <Separator/>
      <Stack horizontal tokens={{childrenGap:30,padding:30}}>
      
      <Stack tokens={{childrenGap:20, maxWidth:'60%'}}>
      <Text variant={'xLarge'} block>Our Solution:-</Text>
      <Text variant={'large'}>From the sample invoices which were provided we have classified them into 7 predefined streams (5 of them with only tables and 2 of them with images in invoice as well as table).</Text>
      <Text variant={'large'}>To classify invoices to their respective classes we are using a shift classifier.</Text>
      <Text variant={'large'}>After calculating shift features we are storing them in annoy API which is the fastest in the world.</Text>
      <Text variant={'large'}>Then for each pipeline we have tarined custum OCR either with Fast-RCNN or SSDs which are custom build for each pipeline.</Text>
      <Text variant={'large'}>For segmenting we have trained a segmentation model.If we need to add support for newer templates we can train our shift classier through this web app only.</Text>
      <Text variant={'large'}>The OCR and Segmentation algorithms can also be customly trained</Text>
      </Stack>
      
      <Image src={solution} width="60%" height="60%"/>
            
      </Stack>
      <Separator/>
      <Stack horizontal tokens={{childrenGap:30,padding:30}}>
      
      <Stack tokens={{childrenGap:20, maxWidth:'60%'}}>
      <Image src={performance} width="80%" height="80%"/>
      </Stack>
      <Stack tokens={{childrenGap:30,padding:30}}>
      <Text variant={'xLarge'} block>OCR accuracy: 86%</Text>
      <Text variant={'xLarge'} block>Table extraction accuracy: 82%</Text>
      <Text variant={'xLarge'} block>Information extraction accuracy: 75%</Text>
      <Text variant={'xLarge'} block>Average reaction time: 7 sec (Total), 1.5 sec (OCR), 2 sec (Information Extraction), 2.5 sec (Table Extraction)</Text>
      </Stack>
      </Stack>
      <Separator/>
      <Stack horizontal>
      <Stack tokens={{childrenGap:30,maxWidth:'80%'}}>
      <Text variant={'xLarge'} block>Training the models and creating pipeline</Text>
      <Text variant={'large'}>In this section we train our shift model for a new template.</Text>
      <Text variant={'large'}>For OCR we are using Fast-RCNN and SSDs. </Text>
      <Text variant={'large'}>We have optimied performance for each of the 7 pipelines being choosing which model to use for OCR  or tweaking some  parameters.</Text> 
      <Text variant={'large'}>But generally our OCR and segmentation remains the same, if we look it from general perspective. </Text>
      <Text variant={'large'}>So for a brand new template you have to give us atleast 15 sample then we will form a new custom pipeline for that</Text>
      </Stack>
      
      <Stack tokens={{childrenGap:20}}>
      <Image src={Training} width="80%" height="80%"/>
      </Stack>
      </Stack>

      </Stack>
      </PivotItem>
      <PivotItem
        headerText="My Invoices"
      >
        <Stack vertical tokens={{padding:'20px'}}>
      <Comp1/>
        <Comp2 value={this.state.value}/>  
        </Stack>
      </PivotItem>
    <PivotItem headerText="Training">
    <Comp3/>
    </PivotItem>
    
    </Pivot>
    </Stack>        

      </div>
      </div>
    ); 
	} 
} 

ReactDOM.render( 
<App/>, 
document.getElementById('root') 
); 
function _alertClicked() {
  alert('Clicked');
}