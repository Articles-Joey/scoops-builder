"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Decal, OrbitControls, useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import useStore from './useStore'
import { CatmullRomCurve3, TextureLoader, Vector3 } from 'three'
import { degToRad } from 'three/src/math/MathUtils'

export default function PreviewCanvas({ imageUrl }) {

    const coneModel = useLoader(GLTFLoader, '/models/cone.glb')
    const cupModel = useLoader(GLTFLoader, '/models/paper_cup.glb')
    const handModel = useLoader(GLTFLoader, '/models/hand.glb')

    const container = useStore(state => state.container);
    const scoops = useStore(state => state.scoops);

    const autoRotate = useStore(state => state.autoRotate);

    return (
        <Canvas camera={{ position: [0, 0, 2] }}>

            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

            <OrbitControls
                autoRotate={autoRotate}
            />

            {/* <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} /> */}

            <group position={[0, -1, 0]}>

                {imageUrl &&
                    <Logo
                        // imageUrl={"/img/test.png"} 
                        imageUrl={imageUrl}
                    />
                }

                {container == "Waffle Cone" &&
                    <primitive
                        object={coneModel.scene}
                        scale={5.6}
                        position={[.018, -0.09, 0]}
                    />
                }

                {container == "Paper Cup" &&
                    <primitive
                        object={cupModel.scene}
                        scale={0.16}
                        position={[0, 0.21, 0]}
                    />
                }

                {container == "Hand" &&
                    <primitive
                        object={handModel.scene}
                        scale={0.02}
                        position={[0, 0.65, 0]}
                        rotation={[0, -2, 0]}
                    />
                }

                {scoops.map((scoop_obj, scoop_i) => {
                    return (
                        <Scoop
                            key={scoop_i}
                            scoop_obj={scoop_obj}
                            isTop={scoop_i + 1 == scoops?.length}
                            position={[0, (0.8 * (scoop_i / 2 + 1)), 0]}
                        />
                    )
                })}
            </group>

        </Canvas>
    )
}

function Logo({ imageUrl }) {
    // const [texture, setTexture] = useState(null);
    // const { gl } = useThree();

    const texture = useTexture(imageUrl)

    // useEffect(() => {
    //     if (!imageUrl) return;

    //     const loader = new TextureLoader();
    //     loader.load(
    //         imageUrl,
    //         (loadedTexture) => {
    //             loadedTexture.wrapS = loadedTexture.wrapT = RepeatWrapping;
    //             setTexture(loadedTexture);
    //         },
    //         undefined,
    //         (error) => console.error("Error loading texture:", error)
    //     );
    // }, [imageUrl]);

    return (
        <mesh
            rotation={[degToRad(180), 0, 0]}
            position={[0, 0.45, 0]}
        >
            <cylinderGeometry args={[0.15, 0.25, 0.5, 16, 1, true, 0, 2]} />
            <meshStandardMaterial
                transparent={true}
                opacity={0}
            />
            {/* {texture && <meshStandardMaterial map={texture} />} */}
            <Decal polygonOffsetFactor={-0} position={[0, 0, 0]} scale={0.5} map={texture} />
        </mesh>
    );
}

function Box(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

function Scoop(props) {

    const toppings = useStore(state => state.toppings);

    // This reference will give us direct access to the mesh
    const meshRef = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX

    const { scoop_obj, isTop, position } = props

    const flavorToColor = {
        "Chocolate": 'saddlebrown',
        "Vanilla": '#F3E5AB',
        "Mint": '#ADEBB3',
        "Strawberry": "#fc5a8d",
    }

    const colorMap = useLoader(TextureLoader, '/img/food_0010_color_1k.jpg');
    const normalMap = useLoader(TextureLoader, '/img/food_0010_normal_directx_1k.png');
    const roughnessMap = useLoader(TextureLoader, '/img/food_0010_roughness_1k.jpg');
    const aoMap = useLoader(TextureLoader, '/img/food_0010_ao_1k.jpg');
    const heightMap = useLoader(TextureLoader, '/img/food_0010_height_1k.png');

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={0.25}
        // onClick={(event) => setActive(!active)}
        // onPointerOver={(event) => setHover(true)}
        // onPointerOut={(event) => setHover(false)}
        >
            {toppings["Sprinkles"] && <Sprinkles />}
            {(toppings["Cherry"] && isTop) && <Cherry position={position} />}

            {/* Sauces */}
            {toppings["Hot Fudge"] && <Drizzle type="Hot Fudge" />}
            {toppings["Marshmallow"] && <Drizzle type="Marshmallow" />}
            {toppings["Caramel"] && <Drizzle type="Caramel" />}
            {toppings["Cherry Sauce"] && <Drizzle type="Cherry Sauce" />}

            <sphereGeometry args={[1, 20]} />
            <meshStandardMaterial
                color={flavorToColor[scoop_obj.flavor]}
                // map={colorMap}
                normalMap={normalMap}
                roughnessMap={roughnessMap}
                aoMap={aoMap}
                displacementMap={heightMap}
                displacementScale={0.5}
            />

        </mesh>
    )
}

function Sprinkles() {
    const sprinkles = useMemo(() => {
        const points = []
        const colors = ['red', 'yellow', 'blue', 'green']
        for (let i = 0; i < 70; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 1.2; // Change this to your desired sphere size
            const x = Math.sin(phi) * Math.cos(theta) * radius;
            const y = Math.sin(phi) * Math.sin(theta) * radius;
            const z = Math.cos(phi) * radius;
            const color = colors[Math.floor(Math.random() * colors.length)]
            points.push({ position: new Vector3(x, y, z), color })
        }
        return points
    }, [])

    return (
        <>
            {sprinkles.map((sprinkle, index) => (
                <mesh key={index} position={sprinkle.position.toArray()} scale={0.1}>
                    <sphereGeometry args={[0.5, 8, 8]} />
                    <meshStandardMaterial color={sprinkle.color} />
                </mesh>
            ))}
        </>
    )
}

// Handles Hot Fudge, Marshmallow, and Caramel
function Drizzle({ type }) {

    const drizzleTypeToColor = {
        "Hot Fudge": 'saddlebrown',
        "Marshmallow": '#fff',
        "Caramel": '#a97947',
        "Cherry Sauce": '#CD001A'
    }

    const fudgeStreaks = useMemo(() => {
        const streaks = []

        // Used to be 5
        for (let i = 0; i < 25; i++) { // Generate 25 streaks
            const points = []
            let theta = Math.random() * Math.PI * 2;
            let phi = Math.acos(2 * Math.random() - 1);

            // Used to be 10
            for (let j = 0; j < 20; j++) { // Each streak has 10 points
                theta += (Math.random() - 0.5) * 0.2;
                phi += (Math.random() - 0.5) * 0.2;
                const radius = 1.23; // Change this to your desired sphere size
                const x = Math.sin(phi) * Math.cos(theta) * radius;
                const y = Math.sin(phi) * Math.sin(theta) * radius;
                const z = Math.cos(phi) * radius;
                points.push(new Vector3(x, y, z));
            }
            streaks.push(new CatmullRomCurve3(points));
        }
        return streaks;
    }, [])

    return (
        <>
            {fudgeStreaks.map((curve, index) => (
                <group key={index}>
                    <mesh>
                        <tubeGeometry args={[curve, 20, 0.05, 8, false]} />
                        <meshStandardMaterial color={drizzleTypeToColor[type]} />
                    </mesh>

                    {/* End caps */}
                    {[curve.points[0], curve.points[curve.points.length - 1]].map((point, i) => (
                        <mesh key={`cap-${index}-${i}`} position={point.toArray()}>
                            <sphereGeometry args={[0.05, 8, 8]} />
                            <meshStandardMaterial color={drizzleTypeToColor[type]} />
                        </mesh>
                    ))}
                </group>
            ))}
        </>
    )
}

// Pretty Please!
function Cherry({ position }) {

    return (
        <group position={[position[0], 1.3, position[2]]}>
            <mesh scale={0.05}>
                <sphereGeometry args={[4, 8, 8]} />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh scale={0.05} rotation={[0.2, 0, 0]} position={[0, 0.38, 0]}>
                <cylinderGeometry args={[.2, .05, 8, 3]} />
                <meshStandardMaterial color={"green"} />
            </mesh>
        </group>
    )
}