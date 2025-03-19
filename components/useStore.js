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
        },
        // {
        //     flavor: 'Strawberry'
        // }
    ],
    setScoops: (value) => set(() => ({ scoops: value })),

    toppings: {
        "Sprinkles": false,
        "Cherry": false,
        "Hot Fudge": false,
        "Marshmallow": false,
        "Caramel": false,
        "Cherry Sauce": false,
    },
    setToppings: (value) => set(() => ({ toppings: value })),

    background: true,
    setBackground: (value) => set(() => ({ background: value })),

    autoRotate: true,
    setAutoRotate: (value) => set(() => ({ autoRotate: value })),

}))

export default useStore