import React, { useEffect } from "react";
import "./Footer.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { useDataLayerValue } from "./DataLayer";

function Footer({ spotify }) {
  const [{ token, item, playing }, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipNext} className="footer__icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon onClick={skipPrevious} className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;

// function Footer({ spotify }) {
//   const [{ token, item, playing }, dispatch] = useDataLayerValue();

//   useEffect(() => {
//     const checkTokenValidity = async () => {
//       try {
//         // Check if the token is valid by fetching user information
//         const user = await spotify.getMe();

//         // Log user information
//         console.log("User information:", user);

//         // Fetch the current playback state
//         const playbackState = await spotify.getMyCurrentPlaybackState();

//         // Log playback state
//         console.log("Playback state:", playbackState);

//         // Update your context with playback information
//         dispatch({
//           type: "SET_PLAYING",
//           playing: playbackState.is_playing,
//         });

//         dispatch({
//           type: "SET_ITEM",
//           item: playbackState.item,
//         });
//       } catch (error) {
//         // If there's an error, log it for debugging
//         console.error(
//           "Error fetching user information or playback state:",
//           error
//         );

//         // Handle premium-required error
//         if (
//           error?.response?.status === 403 &&
//           error?.response?.reason === "PREMIUM_REQUIRED"
//         ) {
//           console.error("Premium required for this feature");
//           // Provide user feedback or alternative functionality
//           // You can also redirect the user to a premium sign-up page
//         } else {
//           // Handle other errors
//           console.error("Error:", error);
//         }
//       }
//     };

//     // Call the function to check token validity and fetch playback state
//     checkTokenValidity();
//   }, [spotify, dispatch]);

//   useEffect(() => {
//     spotify.getMyCurrentPlaybackState().then((r) => {
//       console.log(r);

//       dispatch({
//         type: "SET_PLAYING",
//         playing: r.is_playing,
//       });

//       dispatch({
//         type: "SET_ITEM",
//         item: r.item,
//       });
//     });
//   }, [spotify]);

//   const handlePlayPause = () => {
//     if (playing) {
//       spotify.pause();
//       dispatch({
//         type: "SET_PLAYING",
//         playing: false,
//       });
//     } else {
//       spotify.play();
//       dispatch({
//         type: "SET_PLAYING",
//         playing: true,
//       });
//     }
//   };

//   const skipNext = () => {
//     spotify.skipToNext();
//     spotify.getMyCurrentPlayingTrack().then((r) => {
//       dispatch({
//         type: "SET_ITEM",
//         item: r.item,
//       });
//       dispatch({
//         type: "SET_PLAYING",
//         playing: true,
//       });
//     });
//   };

//   const skipPrevious = () => {
//     spotify.skipToPrevious();
//     spotify.getMyCurrentPlayingTrack().then((r) => {
//       dispatch({
//         type: "SET_ITEM",
//         item: r.item,
//       });
//       dispatch({
//         type: "SET_PLAYING",
//         playing: true,
//       });
//     });
//   };

//   return (
//     <div className="footer">
//       <div className="footer__left">
//         <img
//           className="footer__albumLogo"
//           src={item?.album.images[0].url}
//           alt={item?.name}
//         />
//         {item ? (
//           <div className="footer__songInfo">
//             <h4>{item.name}</h4>
//             <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
//           </div>
//         ) : (
//           <div className="footer__songInfo">
//             <h4>No song is playing</h4>
//             <p>...</p>
//           </div>
//         )}
//       </div>

//       <div className="footer__center">
//         <ShuffleIcon className="footer__green" />
//         <SkipPreviousIcon onClick={skipNext} className="footer__icon" />
//         {playing ? (
//           <PauseCircleOutlineIcon
//             onClick={handlePlayPause}
//             fontSize="large"
//             className="footer__icon"
//           />
//         ) : (
//           <PlayCircleOutlineIcon
//             onClick={handlePlayPause}
//             fontSize="large"
//             className="footer__icon"
//           />
//         )}
//         <SkipNextIcon onClick={skipPrevious} className="footer__icon" />
//         <RepeatIcon className="footer__green" />
//       </div>

//       <div className="footer__right">
//         <Grid container spacing={2}>
//           <Grid item>
//             <PlaylistPlayIcon />
//           </Grid>
//           <Grid item>
//             <VolumeDownIcon />
//           </Grid>
//           <Grid item xs>
//             <Slider aria-labelledby="continuous-slider" />
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// }

// export default Footer;
