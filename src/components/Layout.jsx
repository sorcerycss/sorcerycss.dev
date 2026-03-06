import { Outlet } from "react-router-dom"
import Scene from "./Scene"
import Hero from "./Hero"
import Links from "./Links"

export default function Layout() {
    return (
        <div className="container">
            <main>
                <Scene />
                <Hero />
                <Links />
                <Outlet />
            </main>
        </div>
    )
}