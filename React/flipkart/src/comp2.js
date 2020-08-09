// Importing combination 
import React, {Component} from 'react'; 
import { PrimaryButton,DefaultButton } from '@fluentui/react';
import {
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

  import Comp4 from './comp4'; 
  import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';

  import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
  import { FontWeights, getEdgeChromiumNoHighContrastAdjustSelector, noWrap } from '@uifabric/styling';

  
  const cardstyles= {
    root:{
    height:'100px'
    },
  }
  const iconStyles= {
    root: {
      color: '#0078D4',
      fontSize: 16,
      fontWeight: FontWeights.regular,
    },
  };
  
  const divscrollStyles= {
    root: {
      width: '80%',
      height: '100%',
      padding:'50px',
      overflowX:'scroll',
      whitespace: 'nowrap'
  
    },
  };
  
  const stackdivscrollStyles= {
    root: {
      minHeight:'100%',
      
      minwidth:'1300px',
      width: '1300px',
      height: '100%',
      padding:'50px',
      overflowX:'scroll',
      whitespace: 'nowrap'
  
    },
  };
  const footerCardSectionStyles= {
    root: {
      borderTop: '1px solid #F3F2F1',
    },
  };
  const iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '0 25px',
  });
  
  const EyeIcon= { iconName: 'RedEye' };
  const sectionStackTokens= { childrenGap: 30};
  const cardTokens= { childrenMargin: 12 };
  const footerCardSectionTokens= { padding: '12px 0px 0px' };
  class Comp2 extends Component { 
    constructor(props) 
    { 
        super(props);
        this.state={
          isModalOpen:false,
        showInvoiceDetails:false,
        a:'',
        b:'',
        c:''
        }
    } 
      
    hideModal=()=>
    {
        this.setState({isModalOpen:false})
    }    
    _alertClicked1=()=>
    {
        this.setState({isModalOpen:true})
    }
  stackInvoices()
  {
  const displayInvoices=(u,o,a1,b1,c1)=>
  {
    return (

    <Card key={o} onClick={()=>
      {
          this.setState({isModalOpen:true,a:a1,b:b1,c:c1})
          
      }
      } tokens={cardTokens} aria-label="Basic vertical card" >
    <Card.Item>
      <Persona text={"Invoice "+o}  />
    </Card.Item>
    <Card.Item fill>
      <Image src={u} width="100%" alt="Placeholder image." />
   
    </Card.Item>
  </Card>
    );
  }
  
    var val=JSON.parse(this.props.value);
    
    var data=[],data1=[]
    if(val!=null)
    {
        console.log(val.length,'a')
        for(var i=1;i<val.length;i++)
        {
        data.push(displayInvoices(val[i][1],val[i][0],val[i][2],val[i][3],val[i][4]))
        }
    }
    return <Stack horizontal styles={stackdivscrollStyles} tokens={sectionStackTokens}>{data}</Stack>
  }
    render() {
    return (
        <div>
          {this.state.isModalOpen&&<Comp4 isModalOpen={this.state.isModalOpen} hideModal={this.hideModal} a={this.state.a} b={this.state.b} c={this.state.c}/>}
          {this.stackInvoices()}</div>
  );
} 
}   
 
function _alertClicked() {
    alert('Clicked');
  }  
export default Comp2;
 