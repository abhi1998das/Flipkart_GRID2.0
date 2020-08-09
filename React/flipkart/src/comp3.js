// Importing combination 
import React, {Component} from 'react'; 
import { Spinner,SpinnerSize,PrimaryButton,DefaultButton } from '@fluentui/react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import Training from './img4.svg';

import {
    TextField,
    ActionButton,
    IButtonStyles,
    Icon,
    IIconStyles,
    Image,
    IconButton,
    Persona,
    Stack,
    Label,
    IStackTokens,
    Text,
    ITextStyles,
  } from 'office-ui-fabric-react';
  
  
  const sectionStackTokens= { childrenGap: 30};
  const StackTokens= { childrenGap: 30,padding:'50px'};
  const StackTokensText= { childrenGap: 10,padding:'50px'};
const dialogContentProps = {
    type: DialogType.normal,
  isBlocking: true,
  topOffsetFixed: true,
    title: 'Train Invoices',
    subText: 'Provide the link to google drive zip which contating picture of new Template.',
  };
  class Comp3 extends Component { 
    constructor(props) 
    { 
        super(props)
        this.state={
            upload:false,
            text:'',
            training:false
        }
    }
    
    setText = (e) =>{  
     console.log(e.target.value)
        this.setState({text:e.target.value});  
    }  
    getLoading()
    {
      return (
        <Stack horizontal tokens={sectionStackTokens}><Label>Training Models:</Label><Spinner size={SpinnerSize.large} /></Stack>)
    }
    getFooter()
    {
        return(
            <Stack>
        <TextField label="Drive link:" value={this.state.text} onChange={this.setText} underlined/>
        <Stack horizontal tokens={StackTokens} >
          <PrimaryButton onClick={this.ontrainClick} iconProps={{ iconName: 'Train' }} text="Train" />
          <DefaultButton onClick={this.onUploadClick}>Close</DefaultButton>
        </Stack>
        </Stack>
        )
    }
    ontrainClick=()=>
    {
        var formdata = new FormData();
        formdata.append("url", this.state.text);
        this.setState({training:true})
        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };
        var hold=this
        fetch("http://1d1429db608f.ngrok.io/train", requestOptions)
        .then(response => response.text())
        .then(result => {hold.setState({training:false})
        console.log(result)})
        .catch(error => console.log('error', error));
    }
    onUploadClick=()=>
    {
        this.setState({upload:!this.state.upload});
    }
    render()
    {
        return (
            
        <div>
        <Stack tokens={{padding:40}}>   
            <Stack horizontal tokens={{childrenGap:30,padding:30}}>
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
      <Stack horizontal><PrimaryButton onClick={this.onUploadClick} iconProps={{ iconName: 'Train' }} text="Train Templates" /></Stack>
      </Stack>
        <div>
      <Dialog 
      hidden={!this.state.upload}
      onDismiss={!this.state.upload}
      dialogContentProps={dialogContentProps}>
        
      <DialogFooter >
            {this.state.training?this.getLoading():this.getFooter()}
      </DialogFooter>
      </Dialog>
      </div>
      </div>
        );
    }
}

export default Comp3;
