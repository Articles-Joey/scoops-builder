import { create } from 'zustand'

const useStore = create((set) => ({

    container: "Waffle Cone",
    setContainer: (value) => set(() => ({ container: value })),

    scoops: [
        {
            flavor: 'Vanilla'
        },
        {
            flavor: 'Mint'
        },
        {
            flavor: 'Chocolate'
        }
    ],
    setScoops: (value) => set(() => ({ scoops: value })),

    toppings: {
        "Sprinkles": false,
        "Cherry": false,
        "Hot Fudge": false,
        "Marshmallow": false,
        "Caramel": false         
    },
    setToppings: (value) => set(() => ({ toppings: value })),

}))

export default useStore