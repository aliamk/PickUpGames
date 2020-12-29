import React, { SyntheticEvent } from 'react'
import { Grid } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'
import VisitDetails from '../details/VisitDetails'
import VisitForm from '../form/VisitForm'
import VisitList from './VisitList'

interface IProps {
    visits: IVisit[];
    selectVisit: (id: string) => void;
    selectedVisit: IVisit | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedVisit: (visit: IVisit | null) => void;
    createVisit: (visit: IVisit) => void;
    editVisit: (visit: IVisit) => void;
    deleteVisit: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

const VisitDashboard: React.FC<IProps> = ({ 
    visits, 
    selectVisit, 
    selectedVisit, 
    editMode, 
    setEditMode, 
    setSelectedVisit, 
    createVisit, 
    editVisit, 
    deleteVisit, 
    submitting,
    target 
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <VisitList 
                    visits={visits} 
                    selectVisit={selectVisit} 
                    deleteVisit={deleteVisit} 
                    submitting={submitting} 
                    target={target}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedVisit && !editMode && (
                    <VisitDetails visit={selectedVisit} setEditMode={setEditMode} setSelectedVisit={setSelectedVisit} />
                )}

                {editMode && ( 
                    <VisitForm key={selectedVisit && (selectedVisit.id || 0)} setEditMode={setEditMode} visit={selectedVisit!} createVisit={createVisit} editVisit={editVisit}  submitting={submitting}/>
                )}            
                
                {/* <h2>Activity Filters</h2> */}
            </Grid.Column>
        </Grid>
    )
}

export default VisitDashboard
