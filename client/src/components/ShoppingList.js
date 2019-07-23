import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
//import uuid from 'uuid';
import { connect } from "react-redux"; //prijungia redux su react
import { getItems, deleteItem } from "../actions/itemActions"; //pridedam ir apacioj
import PropTypes from "prop-types";

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  //state = {
  // items: [
  //{id: uuid(), name: "Eggs"},
  // {id: uuid(), name: "Bread"},
  // {id: uuid(), name: "Shnaps"},
  // {id: uuid(), name: "Ballon"}
  //]
  // } pakeiciam i itemaction.js get item

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;

    return (
      /*
      <Container>
          <Button color="dark" 
          style={{marginBottom: '2rem'}}
          onClick={() => {const name = prompt('Enter Item');
          if(name){
              this.setState(state => ({
                  items: [...state.items, {id: uuid(), name}]
              }));
          }}}>
              Add Item
          </Button>
          */

      <Container>
        {!this.props.item.loading ? (
          <ListGroup>
            <TransitionGroup classNames="shopping-list">
              {items.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={800} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      //onClick={() => {
                      // this.setState(state => ({
                      //items: state.items.filter(item => item.id !==id)
                      //}));
                      // }}  su redu pakeiciam i kita
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        ) : (
          <p>loading...</p>
        )}
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
