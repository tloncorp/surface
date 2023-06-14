import { Nav } from "./Nav"
import { Surface } from "./Surface"

export const Main = () => {
  return (
    <main className="flex h-full w-full flex-1 flex-col bg-gray-100">
      <Nav />
      <Surface />
    </main>
  )
}