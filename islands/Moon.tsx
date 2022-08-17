/** @jsx h */
import { h } from "preact"
import { useRef, useLayoutEffect, useState, MutableRef, Ref } from "preact/hooks"
import { IS_BROWSER } from "fresh/runtime.ts"
import { tw } from "twind"
import { OrbitControls } from "orbit"
import * as THREE from "three"

export default () => {
    const ref = useRef()
    const [environment, setEnvironment] = useState<Record<string, any> | undefined>();


    if (IS_BROWSER) {

        // setup
        useLayoutEffect(() => {
            const stars = []

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

            const renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0x111122, 1);
            renderer.setSize(window.innerWidth, window.innerHeight);

            ref!.current!.appendChild(renderer.domElement);


            // moon
            const moonGeo = new THREE.SphereGeometry(20, 32, 32);
            const moonMap = new THREE.TextureLoader().load('/moonmap4k.jpeg');
            const moonBump = new THREE.TextureLoader().load('/moonbump4k.jpeg');


            const moonMat = new THREE.MeshPhongMaterial({ map: moonMap, bumpMap: moonBump, bumpScale: 0.5, shininess: 1 });
            const moonMesh = new THREE.Mesh(moonGeo, moonMat);

            moonMesh.position.z = 30
            moonMesh.position.y = -11



            // earth
            const earthGeo = new THREE.SphereGeometry(10, 32, 32)
            const earthMapColor = new THREE.TextureLoader().load('/earthmap1k.jpeg');
            const earthMapLights = new THREE.TextureLoader().load('/earthlights1k.jpeg');
            const earthBump = new THREE.TextureLoader().load('/earthbump1k.jpeg');
            const earthSpec = new THREE.TextureLoader().load('/earthspec1k.jpeg');

            const earthMat = new THREE.MeshPhongMaterial({ map: earthMapColor, emissive: 0xffffff, emissiveMap: earthMapLights, bumpMap: earthBump, bumpScale: 0.1, specular: new THREE.Color('grey'), specularMap: earthSpec });
            const earthMesh = new THREE.Mesh(earthGeo, earthMat);


            earthMesh.position.x = -10
            earthMesh.position.y = 60
            earthMesh.position.z = -0

            earthMesh.rotation.x = 45
            earthMesh.rotation.y = -45
            earthMesh.rotation.z = 0


            scene.add(earthMesh)

            // stars - added to pivot, spin pivot

            let pivot = new THREE.Object3D()

            for (var z = -1000; z < 1000; z += 20) {

                // Make a sphere (exactly the same as before). 
                const geometry = new THREE.SphereGeometry(0.5, 32, 32)
                const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const sphere = new THREE.Mesh(geometry, material)

                // This time we give the sphere random x and y positions between -500 and 500
                sphere.position.x = Math.random() * 1000 - 500;
                sphere.position.y = Math.random() * 1000 - 500;

                // Then set the z position to where it is in the loop (distance of camera)
                sphere.position.z = z;

                // scale it up a bit
                sphere.scale.x = sphere.scale.y = 2;

                //add the sphere to the scene
                pivot.add(sphere);

                //finally push it to the stars array 
                stars.push(sphere);

            }
            

            scene.add(pivot)



            // lighting

            const spotLight = new THREE.DirectionalLight( 0xfdfbdd );

            spotLight.position.x = 100
            spotLight.position.y = 100
            spotLight.position.z = 0


            spotLight.target.position.x = earthMesh.position.x
            spotLight.target.position.y = earthMesh.position.y
            spotLight.target.position.z = earthMesh.position.z

            scene.add(spotLight);

            scene.add(moonMesh);

            camera.position.y = -8
            camera.position.z = 55

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true
            controls.enableZoom = false
            controls.enablePan = false
            controls.enableRotate = false

            controls.target.set(0, 10, 40)

            const animate = () => {



                requestAnimationFrame(animate);
                controls.update()
                earthMesh.rotation.y += 0.0002
                moonMesh.rotation.z -= 0.00003
                moonMesh.rotation.x -= 0.00003


                // loop through each star
                pivot.rotation.z += 0.00001

                renderer.render(scene, camera);

            }
            animate();


        }, [ref.current])
    }


    return (
        <div class={tw`z-[-1] fixed top-0 left-0`}>
            <div ref={ref} />
        </div>
    )
}