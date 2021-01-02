import { useQuery } from 'react-query';
import ReactPlayer from "react-player"

function LaunchDetails({
  match,
}) {
  const launchId = match.params?.id;
  const { isLoading, error, data } = useQuery(`launch-${launchId}`, () => fetch(`https://api.spacexdata.com/v4/launches/${launchId}`).then(res => res.json()));

  if (isLoading) return 'loading...';
  if (error) return 'shit ' + error;

  return (
    <div>
      {
        data && data.links && (
          <ReactPlayer
            url={data.links.webcast}
          />
        )
      }
    </div>
  );
};
export default LaunchDetails;
