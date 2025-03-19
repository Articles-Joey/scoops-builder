"use client"

import { useHotkeys } from "react-hotkeys-hook";

import useStore from "@/components/useStore";
import dynamic from "next/dynamic";

// import PreviewCanvas from "@/components/PreviewCanvas";
// import { Suspense } from "react";

const PreviewCanvas = dynamic(() => import('@/components/PreviewCanvas'), {
    ssr: false,
})

export default function PageContent() {

    const container = useStore(state => state.container);
    const setContainer = useStore(state => state.setContainer);

    const scoops = useStore(state => state.scoops);
    const setScoops = useStore(state => state.setScoops);

    const toppings = useStore(state => state.toppings);
    const setToppings = useStore(state => state.setToppings);

    return (
        <div className="page page-front-page">

            <div className="preview">
                <div className="background"></div>
                <PreviewCanvas />
            </div>

            <div className="options">

                <div className="mb-3">
                    <div className="h2">Container</div>
                    {['Waffle Cone', 'Paper Cup'].map(item => {
                        return (
                            <button
                                key={item}
                                // active={container == item}
                                className={`btn btn-light ${container == item && 'active'}`}
                                onClick={() => {
                                    setContainer(item)
                                }}
                            >
                                {item}
                            </button>
                        )
                    })}
                </div>

                <hr />

                <div className="mb-3 d-flex justify-content-between align-items-center">

                    <div className="h2 mb-0">Scoops: {scoops.length}</div>

                    {/* <button
                        onClick={() => {
                            let newScoops = scoops.slice(0, -1)
                            setScoops(newScoops)
                        }}
                    >
                        -
                    </button> */}

                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            let newScoops = [
                                ...scoops,
                                {
                                    flavor: "Chocolate"
                                }
                            ]
                            setScoops(newScoops)
                        }}
                    >
                        <i className="fad fa-plus me-2"></i>Add
                    </button>

                </div>

                <div className="">
                    {/* <div className="h2">Flavors:</div> */}
                    <div>
                        {scoops.map((scoop_obj, scoop_i) => {
                            return (
                                <div key={scoop_i} className="mb-2">

                                    {/* <div>{scoop_obj.flavor}</div> */}

                                    {['Chocolate', 'Vanilla', 'Mint'].map(item => {
                                        return (
                                            <button
                                                key={item}
                                                // active={container == item}
                                                className={`btn btn-light ${scoop_obj.flavor == item && 'active'}`}
                                                onClick={() => {

                                                    let newScoops = scoops.map((scoop, index) =>
                                                        index === scoop_i ? { ...scoop, flavor: item } : scoop
                                                    )

                                                    setScoops(newScoops);

                                                }}
                                            >
                                                {item}
                                            </button>
                                        )
                                    })}

                                    {/* Remove scoop button */}
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => {
                                            setScoops(scoops.filter((_, index) => index !== scoop_i));
                                        }}
                                    >
                                        <i className="fas fa-trash me-2"></i>
                                        Remove
                                    </button>

                                </div>
                            )
                        })}
                    </div>
                </div>

                <hr />

                <div className="">
                    <div className="h2">Toppings</div>
                    <div>
                        {Object.keys(toppings).map(topping => (
                            <div key={topping} className="mb-2">

                                <div>
                                    <span className="label">{topping}</span>
                                </div>

                                <button
                                    className={`btn btn-light ${!toppings[topping] ? 'active' : ''}`}
                                    // onClick={() => setToppings(prev => ({ ...prev, [topping]: false }))}
                                    onClick={() => setToppings({ ...toppings, [topping]: false })}
                                >
                                    No
                                </button>
                                <button
                                    className={`btn btn-light ${toppings[topping] ? 'active' : ''}`}
                                    // onClick={() => setToppings(prev => ({ ...prev, [topping]: true }))}
                                    onClick={() => setToppings({ ...toppings, [topping]: true })}
                                >
                                    Yes
                                </button>

                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div >
    )

}