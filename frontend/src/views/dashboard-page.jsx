import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ToyChart } from "../cmps/toy-chart"
import { showErrorMsg } from '../services/event-bus.service'
import { loadToys } from '../store/actions/toy.action'

export function DashboardPage() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

    useEffect(() => {
        onLoadToys()
    }, [])

    function onLoadToys() {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load cars', err)
            })
    }

    function pricePerLabels() {
        const avgPriceLabels = labels.map(label => {
            const labelsToys = toys.map(toy => {
                const isLabel = toy.labels.some(toyLabel => toyLabel === label)
                if (isLabel) return toy.price
                else return 0
            })
            return labelsToys.reduce((acc, value) => acc += (+value), 0) / labelsToys.length
        })
        return avgPriceLabels
    }

    function inventoryByType() {
        const avgPriceLabels = labels.map(label => {
            const labelsToys = toys.map(toy => {
                const isLabel = toy.labels.some(toyLabel => toyLabel === label)
                if (isLabel && toy.inStock) return 1
                else return 0
            })
            return labelsToys.reduce((acc, value) => acc += (+value), 0) / labelsToys.length
        })
        return avgPriceLabels
    }

    return <section className="dashboard-page">
        <h1>Dashboard Page</h1>
        <div className="prices-per-toy-label">
            <span>Prices per toy label</span>
            <ToyChart dataChart={pricePerLabels()} labels={labels} />
        </div>
        <div className="inventory-by-type">
            <span>Inventory by type</span>
            <ToyChart dataChart={inventoryByType()} labels={labels} />
        </div>
    </section>
}