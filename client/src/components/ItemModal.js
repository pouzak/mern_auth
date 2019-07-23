import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
//import uuid from 'uuid';
class ItemModal extends Component{
    state = {
        modal: false,
        name: '' //name irasyt ir i input
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        //this.setState( {[e.target.name]: e.target.value} ); //sitas geriau nes galima keisti
        this.setState({name: e.target.value});

    };
    onSubmit = e => {
        e.preventDefault();
        const newItem = {
            //id: uuid(),
            name: this.state.name

        }
        this.props.addItem(newItem);//prideda item per addItem
        this.toggle();
    }

    render(){
        return(
            <div>
                <Button 
                color="dark"
                style={{marginBottom:'2rem'}}
                onClick={this.toggle}> Add Item
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toogle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label form="item">Item</Label>
                                <Input type="text" name="name" id="item" placeholder="Add Shopping Item" onChange={this.onChange}/> 
                                <Button color="dark" style={{marginTop:'2rem'}} block>Add</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>

        );
    };
};

const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, {addItem})(ItemModal);