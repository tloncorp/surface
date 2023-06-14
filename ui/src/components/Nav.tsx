import Avatar from "./Avatar"
import TabList from "./Tabs/TabList"
import BellIcon from "./icons/BellIcon"
import CompassIcon from "./icons/CompassIcon"
import MagnifyingGlassIcon from "./icons/MagnifyingGlassIcon"
import SurfaceMenu from "./SurfaceMenu"

export const Nav = () => {
  return (
    <header className="flex w-full items-center justify-between text-base gap-2 bg-gray-100 p-2">
      <nav className="flex-1 flex w-full justify-start gap-2">
        <button className="nav-button">
          <MagnifyingGlassIcon className="mr-2 h-5 w-5" />
          Leap
        </button>
        <TabList />
        <SurfaceMenu />
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
    </header>
  )
}