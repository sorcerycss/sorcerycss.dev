import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function Scene() {

    const canvasRef = useRef(null)
    // referance to DOM without causing re-render

    useEffect(() => {
    const canvas = canvasRef.current

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 4)
    const camTarget = new THREE.Vector3(0, 0, 4)

    // Renderer
    const renderer = new THREE.WebGLRenderer(
        {alpha: true,
         antialias: true   
        }
    )

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(280, 280)

    canvas.appendChild(renderer.domElement)

    // Lights
    const ambient = new THREE.AmbientLight(0xa78bfa, 0.4)
    scene.add(ambient)

    const point = new THREE.PointLight(0x4f3d8a, 1.5, 20)
    point.position.set(2, 3, 4)
    scene.add(point)

    const rimLight = new THREE.PointLight(0x4f3d8a, 1.5, 20)
    rimLight.position.set(-3, -2, -2)
    scene.add(rimLight)

    // Geometry --PLACEHOLDER-- SCENE1
    const geometry = new THREE.IcosahedronGeometry(1.1, 1)
    const material = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        emissive: 0x2d1f5e,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.8,
        wireframe: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
        color: 0xa78bfa,
        wireframe: true,
        opacity: 0.08,
        transparent: true,
    })

    const wireMesh = new THREE.Mesh(geometry, wireMat)
    scene.add(wireMesh)



    // SCENE2

    //click zooms the camera in, then a second scene fades in:
    const scene2 = new THREE.Scene()
    const ambient2 = new THREE.AmbientLight(0xa78bfa, 0.4)
    scene2.add(ambient2)
    const geo2   = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16)
    const mat2 = new THREE.MeshStandardMaterial({
    color: 0x4a2d8a,      // slightly lighter purple so light has something to show
    emissive: 0x1a0f3d,
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.3,        // ✅ this is what catches the point light
    })
    const mesh2 = new THREE.Mesh(geo2, mat2)
    scene2.add(mesh2)

    const point2 = new THREE.PointLight(0xffffff, 2, 20)
    point2.position.set(2, 3, 4)
    scene2.add(point2)

    const rimLight2 = new THREE.PointLight(0xa78bfa, 1.5, 20)
    rimLight2.position.set(-3, -2, -2)
    scene2.add(rimLight2)

    // RAYCASTER SETUP
    const raycaster = new THREE.Raycaster()
    const pointer  = new THREE.Vector2()
    let clicked = false

    renderer.domElement.addEventListener('click', (e) => {
        // Convert mouse px → normalized device coords (-1 to +1)
        const rect = renderer.domElement.getBoundingClientRect()
        pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
        pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1

        raycaster.setFromCamera(pointer, camera)
        const hits = raycaster.intersectObject(mesh)

        if (hits.length > 0 && !clicked) {
            clicked = true
            // Trigger here
            camTarget.set(0, 0, 1.8)
        }
    })

    // CURSOR HINT — show pointer on hover
    renderer.domElement.addEventListener('pointermove', (e) => {
    const rect = renderer.domElement.getBoundingClientRect()
    pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
    pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const hover = raycaster.intersectObject(mesh)
    renderer.domElement.style.cursor = hover.length ? 'pointer' : 'default'
    })

    // Animation

    let t = 0
    let frameId

    function animate() {
        frameId = requestAnimationFrame(animate)
        t += 0.008

        if (clicked) alpha = Math.min(alpha + 0.02, 1)

        camera.position.lerp(camTarget, 0.05)

        if (alpha < 1) {
            mesh.rotation.y = t * 0.7
            mesh.rotation.x = Math.sin(t * 0.3) * 0.3
            wireMesh.rotation.copy(mesh.rotation)
            renderer.render(scene, camera)
        } else {
            // Rotate scene2 mesh separately
            mesh2.rotation.y = t * 0.5
            mesh2.rotation.x = Math.sin(t * 0.2) * 0.2
            renderer.render(scene2, camera)
        }
    }

    let alpha = 0

    

    animate()

    // Cleanup
    return () => {
        cancelAnimationFrame(frameId)
        renderer.dispose()
        canvas.removeChild(renderer.domElement)
    }
    }, [])

    return (
        <>
            <div
                className="canvas"
                ref={canvasRef}
            />
        </>
    )
}