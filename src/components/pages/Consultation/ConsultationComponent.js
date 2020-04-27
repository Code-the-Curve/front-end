import React, {Component, useState} from 'react';
import DocumentUpload from '../../molecules/DocumentUpload';
import DefaultLayout from '../../templates/DefaultLayout';
import SideNav from '../../organisms/SideNav';
import Messages from '../../organisms/Messages';

import wsUtil from '../../../utils/webSocket';


import { CONSULTATION_ID, PRACTIONER_ID } from '../../../utils/Constants.js';


class ConsultationComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      activeConsultation: CONSULTATION_ID,
      consultations: {}
    }
    this.loadConsultations();
    this.listernForMessages();
  }
  socket = () => { 
    return wsUtil.getSocket()
  }

  listernForMessages = () => {
    wsUtil.addMessageListener(this.socket, (data) => {
      const { consultation, msg } = data;
      this.setState((prevConsultations) => ({
        ...prevConsultations,
        [consultation]: {
          ...prevConsultations[consultation],
          messages: [ ...(prevConsultations[consultation].messages || []), msg]
        }
      }));
    });
  }

  loadConsultations = () => {
    fetch(`http://localhost:8081/consultation/${PRACTIONER_ID}`)
    .then(data => data.json())
    .then(data => {
      data.forEach(consultation => {
        this.setState(prevConsultations => ({
          ...prevConsultations,
          [consultation._id]: consultation
        }))
      })
    })
    .catch(error => console.error(error)) 
  }

  onSidebarItemClicked = (consultationId) => {
    console.log('aaa', consultationId)
    this.setState({activeConsultation: consultationId});
  }
  onMessageSubmit = (msg) => {
    wsUtil.send(this.socket, this.state.activeConsultation, msg);
  };

  render() {
    return (
      <DefaultLayout>
        <DocumentUpload />
        <SideNav
            onClick={this.onSidebarItemClicked}
            consultations={this.consultations}
            activeConvo={this.state.activeConsultation}/>
        <Messages
            onMessageSubmit={this.onMessageSubmit}
            room={this.state.activeConsultation}
            messages={(this.state.consultations[this.state.activeConsultation] || {messages: []}).messages}
          />
      </DefaultLayout>
    );
  }

};

export default ConsultationComponent;
