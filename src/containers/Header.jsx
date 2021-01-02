import { Link } from 'react-router-dom';
import GitHubButton from 'react-github-btn';

function Header() {
  return (
    <>
      <header class="text-gray-700 bg-white border-t border-b body-font">
        <div class="container flex flex-col flex-wrap p-5 mx-auto md:items-center md:flex-row ">
          <p class="flex items-center w-40 mb-4 font-medium text-gray-900 title-font md:mb-0">
            Launch Checker
          </p>
          <nav class="flex flex-wrap items-center justify-center ml-4 text-base">
            <Link to="/upcoming" class="mr-5 text-sm text-gray-700 rounded-xl hover:text-gray-800">
              Upcoming Launches
            </Link>
            <Link to="/past" class="mr-5 text-sm text-gray-700 rounded-xl hover:text-gray-800">
              Past Launches
            </Link>
          </nav>
          <div class="ml-auto">
            <GitHubButton href="https://github.com/sizzlorox/launch-checker" data-show-count="true" aria-label="Star sizzlorox/launch-checker on GitHub">
              Star
            </GitHubButton>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;

