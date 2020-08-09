import React, {Component} from 'react'; 
import { Spinner,SpinnerSize,PrimaryButton,DefaultButton,DetailsList } from '@fluentui/react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
 
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  
import Comp6 from './comp6'; 
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
    concatStyleSets,
  } from 'office-ui-fabric-react';
  import { loadTheme } from '@fluentui/react';
  import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    ContextualMenu,
    Toggle,
    Modal,
    IDragOptions,
    initializeIcons,
    IIconProps,
  } from 'office-ui-fabric-react';

  initializeIcons();

  const theme = getTheme();
  const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
    },
    header:
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
          
    },
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: { margin: '14px 0' },
        'p:first-child': { marginTop: 0 },
        'p:last-child': { marginBottom: 0 },
      },
    },
  });
  const iconButtonStyles = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: 'auto',
      marginTop: '4px',
      marginRight: '2px',
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
  };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};

var downloadabledata=[]
const cancelIcon= { iconName: 'Cancel' };
  class Comp4 extends Component { 
    constructor(props) 
    { 
        super(props)
        this.state={showdig:false,
          downloadabledata:[],
          ondownload:false
        }
    }
    
    async componentDidMount() {
    await this.getData();
    
    }
    async getData()
    {
    }
    info()
    {
        console.log(this.props.b)
        var datayx=JSON.parse(this.props.b)
        var data=JSON.parse(datayx["task"]["rest"]),extra=[],colex=[],rowex=[]
        data=data["result"]
        var ans=[]
        for(var row in data)
        {
            var colname=[]
            var datat={key:1},hash={}
            var pred = data[row]["prediction"]
            var x=0
            for(var key in pred)
            {
                if(hash[pred[key]["label"]]==1 )
                {

                }
                else
                {
                    hash[pred[key]["label"]]=1
                
                    colname.push({ key: "column"+x, name: pred[key]["label"], fieldName: pred[key]["label"], minWidth: 100, maxWidth: 200, isResizable: true })
                    datat[pred[key]["label"]]=pred[key]["ocr_text"]
                    colex.push(<th>{pred[key]["label"]}</th>)
                    rowex.push(<td>{pred[key]["ocr_text"]}</td>)
                    x++
                }
                
            }
            extra.push(<thead>{colex}</thead>)
            extra.push(<tbody>{rowex}</tbody>)
            
            ans.push(<DetailsList
                id="asd"
                items={[datat]}
                columns={colname}
              />)
              downloadabledata.push(extra)
        }
        
        return ans
    }
    tables()
    {
      downloadabledata=[]
        var dataxy=JSON.parse(this.props.a)
        var ans=[]
        console.log(dataxy)
        ans.push(this.info())
        var v=dataxy["task"]["Tables"];
        var x=0,ui=1000
        for(var key in v)
        {
            var rownames=[],data=[],ronam=[],colval=[]
            var table= JSON.parse(v[key]),tab=[]
            
            var j=0
            for(var row in table)
            {
                var rowd=[]
                var i=0
                for(var col in table[row])
                {
                    if(j==0)
                    {
                        data.push({key:ui})
                        ui++
                    }
                    if(i==0)
                    {
                        if(table[row][col]=='')
                        table[row][col]="column "+x
                        rownames.push({ key: "column "+x, name: table[row][col], fieldName: table[row][col], minWidth: 120, maxWidth: 200, isResizable: true })
                        x++;                    
                        ronam.push(<th>{table[row][col]}</th>)
                    }
                     else
                     {
                        data[col-1][table[row]["0"]]=table[row][col]
                     }
                     i=i+1
                }
                j=j+1
            }
            for(var item in data )
            {
              console.log(data[item])
              var datacol=[]
              for(var row in table)
              {
                if(data[item][table[row][0]]!=undefined)
                {
                  console.log(table[row][0],data[item][table[row][0]])
                datacol.push(<td>{data[item][table[row][0]]}</td>)
                }
                else
                datacol.push(<td></td>)
              }
              colval.push(<tr>{datacol}</tr>)
            }
            colval=<tbody>{colval}</tbody>
            ronam=<thead><tr>{ronam}</tr></thead>
            console.log(data,rownames)
            ans.push(<DetailsList
                items={data}
                columns={rownames}
              />)
              
        downloadabledata.push(ronam)
              
        downloadabledata.push(colval)
            }
        
        return <Stack>{ans}</Stack>;
    }
    clickIcon=()=>
    {
      this.setState({showdig:!this.state.showdig})
    }    
    render()
    {
        return (
                <div>
          
                    <Modal
                    isOpen={this.props.isModalOpen}
                    onDismiss={this.props.hideModal}
                    isBlocking={false}
                    containerClassName={contentStyles.container}
                >
                    
                    <div className={contentStyles.header}>
                    <span>Invoice Information:</span>
                       
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={{iconName:'ImageCrosshair'}}
                        ariaLabel="Close popup modal"
                        onClick={this.clickIcon}
                    
                        />
                        
                        <ReactHTMLTableToExcel  
                          className="btn btn-info"
                          table="emp"
                          filename="ReportExcel"  
                          sheet="Sheet"  
                          buttonText="Export excel" 
                          
                          />
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={this.props.hideModal}
                    />

                    </div>
                    <div className={contentStyles.body}>
                    
                    {this.state.showdig&&<Comp6 changedig={this.clickIcon} data ={this.props.c} showdig={this.state.showdig}/>}
                    {this.tables()}
                    <Stack tokens={{childrengap:20,padding:20}}>
                      <h1>Excel Dump:</h1>
                    {<table id="emp" class="table">{downloadabledata}</table>}
                    </Stack>  
                    </div>
                </Modal>
                
            </div>
        );
    }
}

export default Comp4;
