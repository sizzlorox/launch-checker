import { useQuery } from 'react-query';
import { utcToZonedTime, format } from 'date-fns-tz';
import { withRouter, useHistory } from 'react-router-dom';

const getHeaderImage = (links) => links.length
  ? (
    <img class="object-cover object-center w-full h-40 mb-6 rounded" src={links[0]} alt="content" />
  )
  : null;

const formatTimeZone = (utcDate) => {
  const zonedDate = utcToZonedTime(new Date(utcDate), Intl.DateTimeFormat().resolvedOptions().timeZone);
  return format(zonedDate, 'yyyy-MM-dd HH:mm:ss [OOOO]');
};

function LaunchInfo({
  launchType,
}) {
  let history = useHistory();
  const { isLoading, error, data } = useQuery(`launch-${launchType}`, () => fetch(`https://api.spacexdata.com/v4/launches/${launchType}`).then(res => res.json()));

  if (isLoading) return '...';

  if (error) return 'Oh shit ' + error;

  return (
    <section class="text-gray-700 body-font">
      <div class="container px-8 mx-auto py-36 lg:px-4">
        <div class="flex flex-wrap text-left">
          {
            data && data.map(launchData => (
              <div class="px-8 py-6 lg:w-1/3 md:w-full">
                {getHeaderImage(launchData.links.flickr.original)}
                <h2 class="mb-3 text-lg font-semibold text-gray-700 lg:text-2xl title-font">
                  {launchData.name} - {formatTimeZone(launchData.date_utc)}
                </h2>
                <p class="mb-4 text-base leading-relaxed">
                  {launchData.details}
                </p>
                <a href="#" class="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400" onClick={() => history.push(`/launch/${launchData.id}`)}>
                  Read More
                  <svg class="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                  </svg>
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};
export default withRouter(LaunchInfo);
