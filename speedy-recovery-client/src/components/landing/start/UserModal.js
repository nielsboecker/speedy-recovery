import React, {Component} from 'react';
import {Button, Grid, Modal} from "semantic-ui-react";

class UserModal extends Component {
    render() {
        return (
           <Modal name="modal" size='mini' trigger={<Button color="teal"
                                                             fluid
                                                             size="large"
                                                             name="login"
                                                             className="button">Log in</Button>}>
                <Modal.Header>Select user type</Modal.Header>
                <Modal.Content>
                    <Grid centered>
                        <Button.Group>
                            <Button name="button1" color="teal"
                                    onClick={() => {this.props.onLogin('Practitioner');}}
                            >Practitioner</Button>
                            <Button color="teal"
                                    onClick={() => {this.props.onLogin('Parent');}}
                            >Parent</Button>
                            <Button color="teal"
                                    onClick={() => {this.props.onLogin('Patient');}}
                            >Patient</Button>
                        </Button.Group>
                    </Grid>
                </Modal.Content>
            </Modal>

        );
    }
}

export default UserModal;
