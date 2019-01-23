import React, {Component} from 'react';
import { Divider, Icon, Table } from 'semantic-ui-react'

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <h1>Profile</h1>

                <Table definition>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell width={2}>Name</Table.Cell>
                            <Table.Cell>Robert Smith</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Role</Table.Cell>
                            <Table.Cell>
                                <Icon name="user doctor"/>
                                 Doctor
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default ProfilePage;