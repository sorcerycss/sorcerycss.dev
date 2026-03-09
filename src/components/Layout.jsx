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
                    <Scene />
                    <Hero />
                    <div className="divider"></div>
                    <Links />
                    <Outlet />
                </main>
            </div>
        </>
    )
}