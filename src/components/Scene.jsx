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

    // Geometry --PLACEHOLDER--
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

    // Animation

    let t = 0
    let frameId

    function animate() {
        frameId = requestAnimationFrame(animate)
        t += 0.008
        mesh.rotation.y = t * 0.7
        mesh.rotation.x = Math.sin(t * 0.3) * 0.3
        wireMesh.rotation.copy(mesh.rotation)
        renderer.render(scene, camera)
    }

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