import React from 'react';
import SearchBar from './Searchbar';
import djangoAPI from '../api/djangoAPI';
import VideoDetail from './VideoDetail';
import { withRouter } from "react-router-dom";
import queryString from 'query-string'
import VideoCarrouselSlick from "./VideoCarrouselSlick";


class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
        numberOfPages: 0,
        videosPerPages: 0,
        submitTerm: '',
        nextQuery: ''
    };

    handleSubmit = async (termFromSearchBar) => {
        // API call to retrieve videos from searchbar
        const videos = await this.djangoApi.getVideosByName(termFromSearchBar);
        console.log('recherche')
        this.setState({
            videos: videos.data.results,
            numberOfPages: Math.ceil(videos.data.count / videos.data.results.length),
            videosPerPages: videos.data.results.length,
            nextQuery: videos.data.next
        });
    };

    async componentDidMount() {
        this.djangoApi = new djangoAPI();

        let videoFromQueryString = null;
        const values = queryString.parse(this.props.location.search);
        if (values.video) {
            let id = parseInt(values.video);
            // API call to retrieve current video
            const video = await this.djangoApi.getVideosById(id);
            videoFromQueryString = video.data;
        }
        // API call to retrieve all videos
        const videos = await this.djangoApi.getAllVideos();
        console.log(videos);
        //We look here if a query string for the video is provided, if so load the video
        this.setState({
            videos: videos.data.results,
            selectedVideo: videoFromQueryString,
            numberOfPages: Math.ceil(videos.data.count / videos.data.results.length),
            videosPerPages: videos.data.results.length,
            nextQuery: videos.data.next
        });
    };

    handleVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
        this.props.history.push("/streaming/?video=" + video.id);
        window.scrollTo(0, 0);
    };

    render() {
        return (
            <div className='ui container' style={{ marginTop: '1em' }}>
                <SearchBar handleFormSubmit={this.handleSubmit} />
                <div className='ui grid'>
                    <div className="ui column">
                        <div className="eleven wide row">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                    </div>
                </div>
                <div>
                    {
                        this.state.videos.length > 0 &&
                        <div>
                            <VideoCarrouselSlick
                                videos={this.state.videos}
                                handleVideoSelect={this.handleVideoSelect}
                                numberOfPages={this.state.numberOfPages}
                                videosPerPages={this.state.videosPerPages}
                                nextQuery={this.state.nextQuery}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(App);