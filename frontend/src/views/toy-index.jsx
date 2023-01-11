import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyList } from '../cmps/toy-list'
import { toyService } from '../services/toy.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy} from '../store/actions/toy.action'
import { SET_FILTER } from '../store/reducers/toy.reducer'
import { useEffect } from 'react'
import { ToyFilter } from '../cmps/toy-filter'
import { ToySort } from '../cmps/toy-sort'
import { SET_SORT } from '../store/reducers/toy.reducer'

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
    // const isLoading = useSelector((storeState) => storeState.carModule.isLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        onLoadToys(filterBy,sortBy)
    }, [filterBy,sortBy])

    function onLoadToys(filterBy,sortBy) {
        loadToys(filterBy,sortBy)
            .then(() => {
                // showSuccessMsg('Cars loaded')
            })
            .catch(err => {
                showErrorMsg('Cannot load cars')
            })
    }

    function onRemoveToy(carId) {
        removeToy(carId)
            .then(() => {
                showSuccessMsg('Car removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove car')
            })
    }

    function setFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    function setSort(sortBy) {
        dispatch({ type: SET_SORT, sortBy })
    }

    return <section>
        <main>
            <ToyFilter onSetFilter={setFilter} />
            <ToySort sortBy={sortBy} onSetSort={setSort}/>
            <Link to={`/toy/edit`}>Add Toy</Link>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </main>
    </section>


}
