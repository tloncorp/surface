import { useSurfaceState } from "@/state/surface";
import Surface from "./Surface";

export const Arena = () => {
  const { surfaces } = useSurfaceState();
  
  return (
    <div className="relative flex h-full w-full flex-1 flex-col">
      {surfaces.map((surface) => (
        <Surface
          surface={surface}
          key={surface.id}
        />
      ))}
    </div>
  )
}