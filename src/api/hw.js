import _ from 'lodash'
const words = [
    { id: 1, title: 'iPad 4 Mini', price: 500.01, inventory: 2, name: 'home' },
    {
        id: 2,
        title: 'H&M T-Shirt White',
        price: 10.99,
        inventory: 10,
        name: 'home1'
    },
    {
        id: 3,
        title: 'Charli XCX - Sucker CD',
        price: 19.99,
        inventory: 5,
        name: 'about'
    }
]
export default {
    getWord(cb, name) {
        let word = _.filter(words, function(o) {
            return o.name == name
        })
        setTimeout(() => cb(word), 100)
    }
}
