function Sidebar() {
    
    return(
        <div>
            <div className="w-full h-full">
    <dh-component>
      <div className="flex flex-no-wrap">
        <div style={{ minHeight: "716px" }} className="w-64 absolute sm:relative bg-gray-800 shadow md:h-full flex-col justify-between hidden sm:flex">
          <div className="px-8">
            <div className="h-16 w-full flex items-center"></div>
            <ul className="mt-12">
              <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center mb-6">
                <a href="javascript:void(0)" className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="text-sm ml-2">Dashboard</span>
                </a>
                <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">5</div>
              </li>
              <li className="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <a href="javascript:void(0)" className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="text-sm ml-2">Products</span>
                </a>
                <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">8</div>
              </li>
              <li className="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <a href="javascript:void(0)" className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="text-sm ml-2">Performance</span>
                </a>
              </li>
              <li className="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <a href="javascript:void(0)" className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="text-sm ml-2">Deliverables</span>
                </a>
              </li>
              <li className="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <a href="javascript:void(0)" className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="text-sm ml-2">Invoices</span>
                </a>
                <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">25</div>
              </li>
              <li className="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                <a href="javascript:void(0)" className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="text-sm ml-2">Inventory</span>
                </a>
              </li>
              <li className="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center">
                <a href="javascript:void(0)" className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="text-sm ml-2">Settings</span>
                </a>
              </li>
            </ul>
            <div className="flex justify-center mt-48 mb-4 w-full">
                <div className="relative">
                  <div className="text-gray-300 absolute ml-4 inset-0 m-auto w-4 h-4"></div>
                  <input
                    className="bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-100 rounded w-full text-sm text-gray-300 placeholder-gray-400 bg-gray-100 pl-10 py-2"
                    type="text"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="px-8 border-t border-gray-700">
                <ul className="w-full flex items-center justify-between bg-gray-800">
                  <li className="cursor-pointer text-white pt-5 pb-3">
                    <button
                      aria-label="show notifications"
                      className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300"
                    ></button>
                  </li>
                  <li className="cursor-pointer text-white pt-5 pb-3">
                    <button
                      aria-label="open chats"
                      className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300"
                    ></button>
                  </li>
                  <li className="cursor-pointer text-white pt-5 pb-3">
                    <button
                      aria-label="open settings"
                      className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300"
                    ></button>
                  </li>
                  <li className="cursor-pointer text-white pt-5 pb-3">
                    <button
                      aria-label="open logs"
                      className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300"
                    ></button>
                  </li>
                </ul>
              </div>
              </div>
              <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <div className="w-full h-full rounded border-dashed border-2 border-gray-300"></div>
              </div>
              </div>
              </dh-component>
              
              </div>
        </div>
    )

}

var sideBar = document.getElementById("mobile-nav");
var openSidebar = document.getElementById("openSideBar");
var closeSidebar = document.getElementById("closeSideBar");
sideBar.style.transform = "translateX(-260px)";
function sidebarHandler(flag) {
if (flag) {
sideBar.style.transform = "translateX(0px)";
openSidebar.classList.add("hidden");
closeSidebar.classList.remove("hidden");
} else {
sideBar.style.transform = "translateX(-260px)";
closeSidebar.classList.add("hidden");
openSidebar.classList.remove("hidden");
}
}
              

export default Sidebar