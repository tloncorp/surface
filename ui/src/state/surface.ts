import { create } from "zustand";
import { persist, subscribeWithSelector} from "zustand/middleware";
import { share, isSupported } from "shared-zustand";
import { Surface } from "@/types/surface";
import { getQueryParam } from "@/logic/utils";

interface SurfaceState {
  surfaces: Surface[];
  index: Record<string, number>;
  activeSurface: string | null;
  switchSurface: (id: string) => void;
  addSurface: (surface: Surface) => void;
  removeSurface: (id: string) => void;
  splitSurface: (id: string) => void;
  /**
   * Combines two surfaces.
   * @param sourceId The id of the surface being dragged
   * @param targetId The id of the surface being dropped onto
   */
  combineSurfaces: (sourceId: string, targetId: string) => void;
  moveSurface: (sourceIndex: number, targetIndex: number) => void;
}

function updateSurfaces(surfaces: Surface[]) {
  const index = surfaces.reduce<Record<string, number>>((acc, surface, index) => {
    acc[surface.id] = index;
    return acc;
  }, {});

  return { surfaces: surfaces.sort((a, b) => a.addedAt - b.addedAt), index };
}

export const useSurfaceState = create<SurfaceState>()(subscribeWithSelector(persist((set, get) => ({
  surfaces: [] as Surface[],
  index: {},
  activeSurface: getQueryParam("surface"),
  switchSurface: (id) => {
    set({ activeSurface: id });
  },
  addSurface: (surface) => {
    set((draft) => ({ ...updateSurfaces([...draft.surfaces, surface]), activeSurface: surface.id }))
  },
  removeSurface: (id) => {
    const { index: surfaceIndexes } = get();
    const index = surfaceIndexes?.[id] ?? -1;
    if (index === -1) {
      console.warn("attempted to remove non-existent surface", id);
      return;
    }

    set((draft) => {
      const { surfaces: surfaces, activeSurface } = draft;
      const newSurfaces = [...surfaces];
      newSurfaces.splice(index, 1);
      const newActiveSurface = activeSurface === id ? newSurfaces[index - 1]?.id ?? null : activeSurface;
      return { 
        ...updateSurfaces(newSurfaces), 
        activeSurface: newActiveSurface,
      };
    });
  },
  splitSurface: (id) => {
    const { surfaces: surfaces, index: surfaceIndexes, activeSurface } = get();
    const index = surfaceIndexes?.[id] ?? -1;
    if (index === -1) {
      console.warn("attempted to split non-existent surface", id);
      return;
    }
    const surface = surfaces[index];
    const splitSurfaces = surface.panes.map((pane, i) => {
      return {
        id: surface.id + "-" + i,
        addedAt: surface.addedAt + i,
        panes: [pane],
      };
    });
    const newSurfaces = [...surfaces];
    newSurfaces.splice(index, 1, ...splitSurfaces);

    const newActiveSurface = activeSurface === id ? splitSurfaces[0].id as string : activeSurface;
    set({ ...updateSurfaces(newSurfaces), activeSurface: newActiveSurface });
  },
  combineSurfaces: (draggedId, dropTargetId) => {
    const { surfaces: surfaces, index: surfaceIndexes } = get();
    // Get indexes of specified surfaces and sort --
    const draggedIndex = surfaceIndexes?.[draggedId] ?? -1;
    const dropTargetIndex = surfaceIndexes?.[dropTargetId] ?? -1;
    const draggedSurface = surfaces[draggedIndex];
    const dropTargetSurface = surfaces[dropTargetIndex];
    if (draggedIndex === -1) {
      console.warn("attempted to combine non-existent surface", draggedId);
      return;
    }
    if (dropTargetIndex === -1) {
      console.warn("attempted to combine non-existent surface", dropTargetId);
      return;
    }
    const newSurface = {
      id: draggedSurface.id,
      addedAt: draggedSurface.addedAt,
      panes: [...dropTargetSurface.panes, ...draggedSurface.panes],
    };
    const newSurfaces = surfaces.flatMap((surface) => {
      if (surface.id === draggedId) {
        return [];
      } else if (surface.id === dropTargetId) {
        return newSurface;
      } else {
        return [surface];
      }
    });
    
    set({ ...updateSurfaces(newSurfaces), activeSurface: newSurface.id });
  },
  moveSurface: (sourceIndex, targetIndex) => {
    const { surfaces: surfaces } = get();
    const newSurfaces = [...surfaces];
    const surface = newSurfaces.splice(sourceIndex, 1)[0];
    newSurfaces.splice(targetIndex, 0, surface);
    set({ ...updateSurfaces(newSurfaces) });
  },
}), {
  name: "surface-state",
})));

// progressive enhancement check.
if (isSupported()) {
  // share the property "count" of the state with other surfaces
  share("surfaces", useSurfaceState);
}

const selActiveSurface = (state: SurfaceState) => state.activeSurface;
export const useActiveSurface = () => useSurfaceState(selActiveSurface);