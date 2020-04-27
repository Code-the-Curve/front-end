import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class DocumentUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      modal: false,
      file: null,
      fileLink: null
    }

  }

  toggleModal = () => {
    if(this.state.modal == false) {
      this.setState({modal: true}) 
    } else {
      this.setState({modal: false}) 
    }
  }

  submitForm = (contentType, data, setResponse) =>  {
    axios({
    url: 'http://localhost:8081/documents/upload',
    method: 'POST',
    data: data,
    headers: {
    'Content-Type': contentType
    }
    }).then((response) => {
    if(response.status === 200) {
      this.setState({fileLink: response.data});
      document.getElementById("document-form").reset();
      this.setState({processing: false})

    }
    }).catch((error) => {
    setResponse("error");
    })
   }

  uploadDocument = (e) => {
    e.preventDefault();
    this.setState({processing: true})
    let res;
    let UploadDocument = document.getElementById('fileinput')
    if(UploadDocument.files.length) {
      const formData = new FormData();
      formData.append("document", this.state.file);
     
      this.submitForm("multipart/form-data", formData, (msg) => console.log(msg));
    }
    else {
      alert('please select a file');
      this.setState({processing: false})

      console.log('please select a file');
    }
  }

  render() {
    let btnText = 'Submit';
    if(this.state.processing){
      btnText = 'Processing';
    }
 
    let linkText = '';
    if(this.state.fileLink) {
      linkText = 'Please copy this entire link and share it with your patient:';
    }
    return (
      <div>
        <h3>Upload Document to share with Patients</h3>
        <Button color="primary" onClick={this.toggleModal}>Upload</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Upload Document</ModalHeader>
          <ModalBody>
            {linkText}
            {
          this.state.fileLink
            ?  <textarea id="res">{this.state.fileLink}</textarea>
            : null
             }
           
            <Form
              id="document-form"
              onSubmit={e => {
              this.uploadDocument(e);
            }}>
              <FormGroup>
                <Label for="document">File</Label>
                <Input
                  type="file"
                  name="document"
                  id="fileinput"
                  onChange={(e) => this.setState({file: e.target.files[0]})}/>
                <FormText color="muted">
                  Upload a file and get a url to share with patients
                </FormText>
              </FormGroup>
              <Button>{btnText}</Button>

            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

};

export default DocumentUpload;
