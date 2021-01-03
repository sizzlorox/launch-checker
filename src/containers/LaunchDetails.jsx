import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { post } from 'axios';
import { utcToZonedTime, format } from 'date-fns-tz';
import ReactPlayer from "react-player"

import Description from './Description';
import Crew from './Crew';
import Ship from './Ship';
import Core from './Core';
import LandingPad from './LandingPad';

const formatTimeZone = (utcDate) => {
  const zonedDate = utcToZonedTime(new Date(utcDate), Intl.DateTimeFormat().resolvedOptions().timeZone);
  return format(zonedDate, 'yyyy-MM-dd HH:mm:ss [OOOO]');
};

function LaunchDetails({
  match,
}) {
  const launchId = match.params?.id;
  const {
    isLoading: launchIsLoading,
    error: launchError,
    data: launchData,
  } = useQuery(`launch-${launchId}`, () => fetch(`https://api.spacexdata.com/v4/launches/${launchId}`).then(res => res.json()));
  const [payloadData, setPayloadData] = useState();
  const [landingPadData, setLandingPadData] = useState();
  const [launchPadData, setLaunchPadData] = useState();
  const [crewData, setCrewData] = useState();
  const [shipData, setShipData] = useState();
  const [coreData, setCoreData] = useState();

  useEffect(() => {
    if (launchIsLoading || !launchData) return;
    if (!launchData.payloads.length) return;

    post('https://api.spacexdata.com/v4/payloads/query', { 'query': { 'launch': launchId }})
      .then(res => setPayloadData(res.data));

    post('https://api.spacexdata.com/v4/landpads/query', { 'query': { 'launches': launchId }})
    .then(res => setLandingPadData(res.data));

    post('https://api.spacexdata.com/v4/launchpads/query', { 'query': { 'launches': launchId }})
    .then(res => setLaunchPadData(res.data));

    post('https://api.spacexdata.com/v4/crew/query', { 'query': { 'launches': { '$in': launchId } }})
      .then(res => setCrewData(res.data));

    post('https://api.spacexdata.com/v4/ships/query', { 'query': { 'launches': { '$in': launchId } }})
      .then(res => setShipData(res.data));

    post('https://api.spacexdata.com/v4/cores/query', { 'query': { 'launches': { '$in': launchId } }})
      .then(res => setCoreData(res.data));
  }, [launchIsLoading, launchData, launchId]);

  if (launchIsLoading) return 'loading...';
  if (launchError) return 'shit ' + launchError;

  console.log(launchData, launchId, crewData);

  return (
    <section class="text-gray-700 body-font">
      <div class="container px-8 mx-auto py-36 lg:px-4">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="flex-1 min-w-0">
            <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {launchData.name}
            </h1>
            <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                {formatTimeZone(launchData.date_utc)}
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap text-left">
          {
            launchData.links ? (
              <ReactPlayer
                url={launchData.links.webcast}
              />
            ) : null
          }
          {launchData.details}
          <section class="text-gray-700 body-font">
            <div class="container flex flex-col py-16 mx-auto md:flex-row">
              <div class="w-5/6 mb-10 lg:max-w-lg lg:w-full md:w-1/2 md:mb-0">
                {
                  payloadData && payloadData.docs.length ? payloadData.docs.map(payload => (
                    <Description data={payload} />
                  )) : null
                }
              </div>
              <div class="flex flex-col items-center text-center lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 md:items-start md:text-left">
                {
                  crewData && crewData.docs.length ? (
                    <>
                      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Crew
                      </h2>
                      <Crew data={crewData.docs} />
                    </>
                  ) : null
                }
                {
                  shipData && shipData.docs.length ? (
                    <>
                      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Ships
                      </h2>
                      <Ship data={shipData.docs} />
                    </>
                  ) : null
                }
                {
                  launchPadData && launchPadData.docs.length ? (
                    <>
                      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Launch Pad
                      </h2>
                      <LandingPad data={launchPadData.docs} />
                    </>
                  ) : null
                }
                {
                  landingPadData && landingPadData.docs.length ? (
                    <>
                      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Landing Pad(s)
                      </h2>
                      <LandingPad data={landingPadData.docs} />
                    </>
                  ) : null
                }
              </div>
            </div>
          </section>
          <section>
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Cores
            </h2>
            {
              coreData && coreData.docs.length ? (
                <Core data={coreData.docs} />
              ) : null
            }
          </section>
        </div>
      </div>
    </section>
  );
};
export default LaunchDetails;
