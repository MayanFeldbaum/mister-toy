import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { ToyList } from '../cmps/toy-list'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy} from '../store/actions/toy.action'
import { ToyFilter } from '../cmps/toy-filter'
import { SET_FILTER } from '../store/reducers/toy.reducer'
import { ToySort } from '../cmps/toy-sort'
import { SET_SORT } from '../store/reducers/toy.reducer'

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
    // const isLoading = useSelector((storeState) => storeState.carModule.isLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        loadToys(filterBy,sortBy)
    }, [filterBy,sortBy])

    async function onRemoveToy(carId) {
        try {
            await removeToy(carId)
            console.log('Toy removed')
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.error('Error:', err.message)
        } finally {
            console.log('Always run')
        }
    }

    function setFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    function setSort(sortBy) {
        dispatch({ type: SET_SORT, sortBy })
    }

    return <section>
        <main>
            <div className="filters">
            <ToyFilter onSetFilter={setFilter} />
            <ToySort sortBy={sortBy} onSetSort={setSort}/>
            </div>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </main>
    </section>
}
