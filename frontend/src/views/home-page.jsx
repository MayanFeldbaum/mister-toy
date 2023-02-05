import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link} from "react-router-dom"

import { loadToys } from '../store/actions/toy.action'
import { ToyPreview } from '../cmps/toy-preview'

export function HomePage() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const filteredToys = toys.filter(toy => toy.price < 50)

    useEffect(() => {
        loadToys(filterBy, sortBy)
    }, [filterBy, sortBy])

    return <section className="home-page">
        <section className="cover-home"></section>
        <h1>WELCOME</h1>
        <h2 className="slogan">Where imagination grows with every playtime!</h2>
        <h2>Best Sellers & Favorites: Get yours now!</h2>
        <div className="products-sale">
            {filteredToys.map(toy =>
                <section className="toy-list" key={toy._id}>
                    <div className="toy-preview">
                        <ToyPreview toy={toy} />
                    </div>
                </section>
            )}
        </div >
        <Link className="btn btn-a" to="/toy">SHOP ALL</Link>
    </section >
}
