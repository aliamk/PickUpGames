import { createContext, SyntheticEvent } from 'react'
import { observable, action, computed, configure, runInAction } from 'mobx'

import agent from '../api/agent'
import { IVisit } from '../models/visit_interface'


// Enables strict mode - state mutations must be confined to within @actions
configure({ enforceActions: 'always' })

class VisitStore {

    @observable visitRegistry = new Map()
    @observable visits:IVisit[] = []
    @observable selectedVisit: IVisit | undefined
    @observable editMode = false
    @observable loadingInitial = false  // the loading icon for the whole app
    @observable submitting = false      // the loading icon within buttons
    @observable target = ''             // created for the deleteVisit action

    // ========  Sorting Visit posts by date order ======== //
    @computed get visitsByDate() {
        return Array.from(this.visitRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    // ========  API CALLS (see useEffect in App.tsx) ======== //
    @action loadVisits = async () => {
        this.loadingInitial = true      // mutating state with MobX
        try {
            const visits = await agent.Visits.list()    
            runInAction('loading visits', () => {
                visits.forEach((visit) => {
                    visit.date = visit.date.split('.')[0]
                    this.visitRegistry.set(visit.id, visit);
                })
                this.loadingInitial = false
            }) 
            } catch (error) {
                runInAction('loading visits error', () => {
                    this.loadingInitial = false;                
                })
            console.log(error)
        }
    }

    // ========  Replaced Handler methods in App.tsx ======== //
    // Method for creating Visit posts
    @action createVisit = async (visit: IVisit) => {
        this.submitting = true
        try {
            await agent.Visits.create(visit)       
            runInAction('creating visit', () => {
                this.visitRegistry.set(visit.id, visit);
                this.submitting = false
            })
        } catch (error) {
            runInAction('creating visit error', () => {
                this.submitting = false
            })
            console.log(error)
        }
    }

    // Method for editing Visit posts
    @action editVisit = async (visit: IVisit) => {
        this.submitting = true
        try {
            await agent.Visits.update(visit)             
            runInAction('editing visit', () => {
                this.visitRegistry.set(visit.id, visit);
                this.selectedVisit = visit
                this.editMode = false
                this.submitting = false
            })          
        } catch (error) {                   
            runInAction('editing visit error', () => {
                this.submitting = false
            })
            console.log(error)
        }
    }

    // Method for deleting Visit posts
    @action deleteVisit = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true
        this.target = event.currentTarget.name
        try {
            await agent.Visits.delete(id)                
            runInAction('deleting visit', () => {
                this.visitRegistry.delete(id)
                this.submitting = false
                this.target = ''
            })               
        } catch (error) {               
            runInAction('deleting visits error', () => {
                this.submitting = false
                this.target = ''
            })               
            console.log(error)
        }
    }

    // Button functionality
    @action openCreateForm = () => {
        this.editMode = true
        this.selectedVisit = undefined
    }

    @action canceSelectedVisit = () => {
        this.selectedVisit = undefined
    }

    @action cancelFormOpen = () => {
        this.editMode = false
    }

    @action openEditForm = (id: string) => {
        this.selectedVisit =  this.visitRegistry.get(id)
        this.editMode = true
    }
    
    @action selectVisit = (id: string) => {
        this.selectedVisit = this.visitRegistry.get(id)
        this.editMode = false
    }
}

export default createContext(new VisitStore())