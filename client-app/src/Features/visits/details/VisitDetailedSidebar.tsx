import React, { Fragment } from 'react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { IAttendee } from '../../../App/models/visit_interface';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

interface IProps {
  attendees: IAttendee[];
}

const VisitDetailedSidebar: React.FC<IProps> = ({ attendees }) => {

    return (
        <Fragment>
            <Segment textAlign='center' style={{ border: 'none' }} attached='top' secondary inverted color='teal' >
            {/* How many people are going? */}
            {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.map(attendee => (
                    <Item key={attendee.username} style={{ position: 'relative' }}>                  
                    {attendee.isHost && 
                        <Label style={{ position: 'absolute' }} color='orange' ribbon='right' >
                        Host
                        </Label>
                    }  
                    <Image size='tiny' src={attendee.image || '/assets/users/user.png'} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3'>  
                        <Link to={`/profile/${attendee.username}`}>{attendee.displayName}</Link>                     
                        </Item.Header>                       
                        <Item.Extra style={{ color: 'orange' }}></Item.Extra>
                    </Item.Content>
                    </Item>
                ))}  
                </List>       
            </Segment>
        </Fragment>
    )
}

export default  observer(VisitDetailedSidebar);
