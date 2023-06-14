import { useCallback, useState } from "react"
import Avatar from "./Avatar"
import NewTabModal from "./Tabs/NewTabModal"
import TabList from "./Tabs/TabList"
import BellIcon from "./icons/BellIcon"
import CaretDownIcon from "./icons/CaretDownIcon"
import CompassIcon from "./icons/CompassIcon"
import MagnifyingGlassIcon from "./icons/MagnifyingGlassIcon"
import OpenAppIcon from "./icons/OpenAppIcon"
import { useSurfaceState } from "@/state/surface"
import { Pane } from "@/types/surface"

export const Nav = () => {
  const { addSurface } = useSurfaceState();
  const [showNewTabPicker, setShowNewTabPicker] = useState(false);
  const handlePressAddTab = useCallback(
    () => setShowNewTabPicker((p) => !p),
    []
  );

  const handleNewTabPickerClosed = useCallback(
    () => setShowNewTabPicker(false),
    []
  );

  const handleTabAdded = useCallback(
    (pane: Pane) => {
      const id = pane.title + new Date().getTime();
      addSurface({ id, panes: [pane], addedAt: new Date().getTime() });
      setShowNewTabPicker(false);
    },
    [addSurface]
  );

  return (
    <header className="flex w-full items-center justify-between text-base gap-2 bg-gray-100 p-2">
      <nav className="flex-1 flex w-full justify-start gap-2">
        <button className="nav-button">
          <MagnifyingGlassIcon className="mr-2 h-5 w-5" />
          Leap
        </button>
        <TabList />
        <button
          className="nav-button"
          onClick={handlePressAddTab}
        >
          <OpenAppIcon className="mr-2 h-5 w-5 text-gray-400" />
          <CaretDownIcon className="h-4 w-4 text-gray-400" />
        </button>
      </nav>
      <nav className="flex w-full flex-row items-center justify-end gap-2">
        <button className="nav-button">
          <CompassIcon className="mr-2 h-4 w-4" />
          Find Apps
        </button>
        <button className="nav-button">
          <p className="w-5 text-lg">?</p>
        </button>
        <button className="nav-button">
          <BellIcon className="h-5 w-5" />
        </button>
        <Avatar ship={window.our} size="small" />
      </nav>
      <NewTabModal
        isOpen={showNewTabPicker}
        onSurfaceSelected={handleTabAdded}
        onClose={handleNewTabPickerClosed}
      />
    </header>
  )
}