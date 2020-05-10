import React from 'react';
import { client } from '../api/djangoAPI';


async function HandleNextEpisode(handleVideoSelect, nextEpisodeID) {
    const video = await client.getVideoById(nextEpisodeID);
    handleVideoSelect(video);
}

const VideoDetail = ({ video, handleVideoSelect }) => {
    if (!video) {
        return null;
    }
    return (

        <div>
            <div className="ui embed">
                <video preload="auto" controls width="320" height="240" key={video.id}>
                    <source src={video.videoUrl} title='Video player' />
                    {video.frSubtitleUrl && <track label="French" kind="subtitles" srcLang="fr" src={video.frSubtitleUrl} />}
                    {video.enSubtitleUrl && <track label="English" kind="subtitles" srcLang="eng" src={video.enSubtitleUrl} />}
                    {video.ovSubtitleUrl && <track label="OV" kind="subtitles" srcLang="ov" src={video.ovSubtitleUrl} />}
                </video>
                {video.nextEpisode && <button onClick={() => {HandleNextEpisode(handleVideoSelect,video.nextEpisode);}
            }>coucou</button>}
            </div>
            <div className="ui segment">
                <h4 className="ui header">{video.name}</h4>
            </div>
        </div>
    );
};

export default VideoDetail;
