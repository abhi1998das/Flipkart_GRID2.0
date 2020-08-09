// Importing combination 
import React, {Component} from 'react'; 
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import {CommandBarButton,Spinner,SpinnerSize, PrimaryButton,DefaultButton,Stack, Label, initializeIcons } from '@fluentui/react';

initializeIcons();
/*const stackstyle = {
}

const stackstylev = {
  padding:'300px'
}*/

const dialogContentProps = {
    type: DialogType.normal,
  isBlocking: true,
  topOffsetFixed: true,
    title: 'Upload Invoice',
    subText: 'You can upload any pdf or image file (jpg png or pdf)',
  };
  
  const sectionStackTokens= { childrenGap: 30};
  const StackTokens= { childrenGap: 30,padding:'50px'};
  
class Comp1 extends Component { 
    constructor(props) 
    { 
        super(props);
        this.state={
        upload:false,
        process:false,
        loadingstate:''
      } ; 
    } 
    onUploadClick=()=>
    {
        this.setState({upload:!this.state.upload});
    }
    onChooseClick=()=>
    {
        this.uploadImage();
    }
    getFooter()
    {
      return(
        <div>
        <input type="file" className="input-image"  text="Choose File" />
        <Stack horizontal tokens={StackTokens} >
          <PrimaryButton onClick={this.onChooseClick} >Save</PrimaryButton>
          <DefaultButton onClick={this.onUploadClick}>Close</DefaultButton>
        </Stack></div>
      )
    }
    getLoading()
    {
      return (
        <Stack horizontal tokens={sectionStackTokens}><Label>{this.state.loadingstate}:</Label><Spinner size={SpinnerSize.large} /></Stack>)
    }
    uploadImage() {
        const r = new XMLHttpRequest()
        const d = new FormData()
        const e = document.getElementsByClassName('input-image')[0].files[0]
        var u,hold=this
        this.setState({process:true})
        hold.setState({loadingstate:'Storing image to Imgur'})
        d.append('image', e)
    
        r.open('POST', 'https://api.imgur.com/3/image/')
        r.setRequestHeader('Authorization', `Client-ID e9d73e19cff5e11`)
        r.onreadystatechange = function () {
          if(r.status === 200 && r.readyState === 4) {
            let res = JSON.parse(r.responseText)
            u = `https://i.imgur.com/${res.data.id}.jpg`
            console.log(u);
            localStorage.setItem('link', u);

            var data1 = new FormData();
            data1.append("url", u);

            var xhr1 = new XMLHttpRequest();
            xhr1.withCredentials = true;

            hold.setState({loadingstate:'Extracting Information'})
                  
            xhr1.addEventListener("readystatechange", function() {
              if(this.readyState === 4) {
                console.log(this.responseText);
                var extractresp=this.responseText;
                  var xhrdig = new XMLHttpRequest();
                  
                  hold.setState({loadingstate:'Creating digital Invoice using OCR'})
                      
                  xhrdig.addEventListener("readystatechange", function() {
                    if(this.readyState === 4) {
                      console.log(this.responseText);
                      var digitalresp =this.responseText;

                      var datatable = new FormData();
                      datatable.append("url", u);

                      var xhrtable = new XMLHttpRequest();
                      
                      xhrtable.addEventListener("readystatechange", function() {
                        if(this.readyState === 4) {
                          
                          console.log(this.responseText);
                          
                          var tableresp=this.responseText;
                          
                          console.log(tableresp);
                          hold.setState({loadingstate:'Storing image to database with extracted values'})
                          
                          const request = new XMLHttpRequest()
                        
                          const Insert= {
                            "Link":u,
                            "Digital":digitalresp,
                            "Extract":extractresp,
                            "Table":tableresp
                        }
                          request.open('POST', 'https://localhost:44312/api/Bulk')
                          request.onreadystatechange = function () {              
                            if(request.status === 200 && request.readyState === 4) 
                            {
                              hold.setState({process:false})
                            }
                          }
                          
                          request.setRequestHeader("Content-Type", "application/json");
                          request.send(JSON.stringify(Insert))
                        }
                      });

                      xhrtable.open("POST", "http://1d1429db608f.ngrok.io/table");

                      xhrtable.send(datatable);
                    }
                  });

                  xhrdig.open("POST", "https://localhost:44312/api/Values?image="+u+"&operation=Digital&key=fcbd9901-26f5-4a43-b385-6a3609a3ebeb");

                  xhrdig.send();
              }
          });
          
          xhr1.open("POST", "http://1d1429db608f.ngrok.io");

          xhr1.send(data1);              
          }
        }
        r.send(d)
    }
    
    render() {
    return (
        <div>
          <Stack horizontal tokens={sectionStackTokens}>
          <CommandBarButton onClick={this.onUploadClick} iconProps={{ iconName: 'Upload' }} text="Upload Invoice" />
          <CommandBarButton iconProps={{ iconName: 'Delete' }} text="Delete Invoice" />
          <CommandBarButton iconProps={{ iconName: 'RedEye' }} text="Show Invoice Details" />
          </Stack>
        <div>




        <Dialog 
        hidden={!this.state.upload}
        onDismiss={!this.state.upload}
        dialogContentProps={dialogContentProps}>
          
        <DialogFooter >
          {this.state.process?this.getLoading("Loading..."):this.getFooter()}
        </DialogFooter>
        </Dialog>
        </div>
        </div>
  );
} 
}   
   
export default Comp1;