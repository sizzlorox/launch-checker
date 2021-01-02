

function Header() {
  return (
    <>
      <header class="text-gray-700 bg-white border-t border-b body-font">
        <div class="container flex flex-col flex-wrap p-5 mx-auto md:items-center md:flex-row ">
          <a class="flex items-center w-40 mb-4 font-medium text-gray-900 title-font md:mb-0">
            <img src="../badges/WhitePink.svg" alt="" />
          </a>
          <button class="p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring ">
              <span class="sr-only">View notifications</span>
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
          </button>
          <button class="flex ml-3 text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 border border-white rounded-full" src="https://res.cloudinary.com/the-unicorns-feed/image/upload/v1606463246/avatars/mke2_wnzylr.png" alt="" />
          </button>
        </div>
      </header>
      <header class="text-gray-700 border-t border-b body-font">
        <div class="container flex flex-col flex-wrap p-5 mx-auto md:items-center md:flex-row ">
          <nav class="flex flex-wrap items-center justify-center ml-4 text-base">
            <a href="#" class="mr-5 text-sm text-gray-700 rounded-xl hover:text-gray-800">
              Upcoming Launches
            </a>
            <a href="#" class="mr-5 text-sm text-gray-700 rounded-xl hover:text-gray-800">
              Latest Launches
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Header;
