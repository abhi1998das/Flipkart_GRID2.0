import React, {Component} from 'react'; 
import ReactDOM from 'react-dom'; 
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

class Comp5 extends React.Component {
    componentDidMount() {
      const canvas = document.getElementById("canv")
      const ctx = canvas.getContext("2d")
        this.updateCanvas();
    }
    updateCanvas() {
        var data=this.props.data
        
        var js=JSON.parse(JSON.parse(data))
        console.log(js)
        for(var i=0;i<js.length;i++){
        var ctx = this.refs.canvas.getContext('2d');
        ctx.font = "12px Arial";
        ctx.strokeText(js[i]["Text"],js[i]["XLeft"],js[i]["YTop"]);
        }
    }
    render() {
      return(
        <div>
            
          <canvas id="canv" ref="canvas" width={1500} height={1000} >
          </canvas>
          
        </div>
      )
    }
  }
  export default Comp5