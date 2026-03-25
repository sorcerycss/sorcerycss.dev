import { Outlet } from "react-router-dom"
import Scene from "./Scene"
import Hero from "./Hero"
import Links from "./Links"

export default function Layout() {
    return (
        <>
            <div className="glow"></div>
            <div className="container">
                <main className="main">
                    <div id="canvas-wrap">
                        <div class="ring"></div>
                        <div class="ring ring-2"></div>
                        <Scene />
                    </div>
                    <Hero />
                    <div className="divider"></div>
                    <Links />
                    <Outlet />
                </main>
            </div>
        </>
    )
}