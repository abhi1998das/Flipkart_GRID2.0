import React, {Component} from 'react'; 
import { Spinner,SpinnerSize,PrimaryButton,DefaultButton,DetailsList } from '@fluentui/react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
 
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

  import Comp5 from './comp5'; 
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
const cancelIcon= { iconName: 'Cancel' };
  class Comp6 extends Component { 
    constructor(props) 
    { 
        super(props)
    }
    
        
    render()
    {
        return (
            <div>
                    <Modal
                    isOpen={this.props.showdig}
                    onDismiss={this.props.changedig}
                    isBlocking={false}
                    containerClassName={contentStyles.container}
                >
                    
                    <div className={contentStyles.header}>
                    <span>Digital Invoice:</span>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={this.props.changedig}
                    />
                    </div>
                    <div className={contentStyles.body}>
                    <Comp5 data ={this.props.data}/>
                    </div>
                </Modal>
            
            </div>
        );
    }
}

export default Comp6;
