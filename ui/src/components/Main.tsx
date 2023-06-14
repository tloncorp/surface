import { Nav } from "./Nav"
import { Arena } from "./Arena"

export const Main = () => {
  return (
    <main className="flex h-full w-full flex-1 flex-col bg-gray-100">
      <Nav />
      <Arena />
    </main>
  )
}