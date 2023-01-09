import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyList } from '../cmps/toy-list'
import { toyService } from '../services/toy.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.action'
import { SET_FILTER } from '../store/reducers/toy.reducer'
import { useEffect } from 'react'
import { ToyFilter } from '../cmps/toy-filter'
// import { PopupMenu } from '../cmps/popup-menu.jsx'

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

    // const isLoading = useSelector((storeState) => storeState.carModule.isLoading)
    // const shoppingCart = useSelector((storeState) => storeState.carModule.shoppingCart)
    const dispatch = useDispatch()

    useEffect(() => {
        onLoadToys(filterBy)
    }, [filterBy])

    function onLoadToys(filterBy) {
        loadToys(filterBy)
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

    // function onAddToy() {
    //     const carToSave = toyService.getRandomCar()
    //     saveCar(carToSave)
    //         .then((savedCar) => {
    //             showSuccessMsg(`Car added (id: ${savedCar._id})`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot add car')
    //         })
    // }

    // function onEditToy(car) {
    //     const price = +prompt('New price?')
    //     const carToSave = { ...car, price }

    //     saveToy(carToSave)
    //         .then((savedCar) => {
    //             showSuccessMsg(`Car updated to price: $${savedCar.price}`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot update car')
    //         })
    // }

    // function addToCart(car) {
    //     console.log(`Adding ${car.vendor} to Cart`)
    //     dispatch({ type: ADD_TO_CART, car })
    //     showSuccessMsg('Added to Cart')
    // }

    function setFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }
    return <section>
        <h3>Toys App</h3>
        <main>
            <ToyFilter onSetFilter={setFilter} />
            {/* {isLoading && <p>Loading...</p>} */}
            {/* <Link to={`/toy/edit`}>Add Toy</Link>
            <button onClick={onAddCar}>Add random Toy</button>
            // <ToyFilter onSetFilter={setFilter} />
            {isLoading && <p>Loading...</p>} */}
            <Link to={`/toy/edit`}>Add Toy</Link>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            {/* <ToyList */}
            {/* toys={toys} */}
            {/* // onRemoveToy={onRemoveToy}
                // onEditToy={onEditToy}
                // addToCart={addToCart} */}
            {/* /> */}
        </main>
    </section>


}
