
from rest_framework import viewsets, generics
from StreamServerApp.serializers.subtitles import SubtitleListSerializer
from StreamServerApp.models import Subtitle
from StreamServerApp.media_processing import convert_subtitles_to_webvtt
import os
from django.conf import settings


class SubtitleViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `search` actions for Videos
    """

    queryset = Subtitle.objects.all()
    serializer_class = SubtitleListSerializer

    def _allowed_methods(self):
        return ['GET', 'POST']

    def perform_create(self, serializer):
        datafile = self.request.data.get('datafile')
        if datafile.name.endswith(".srt"):
            filename = os.path.splitext(datafile.name)[0]
            vtt_path = os.path.join(settings.VIDEO_ROOT, filename + ".vtt")
            srt_path = os.path.join(
                settings.BASE_DIR, str(self.request.data.get('datafile')))

            webvtt_subtitles_relative_path = os.path.relpath(
                vtt_path, settings.VIDEO_ROOT)

            vtt_remote_path = os.path.join(settings.VIDEO_URL, webvtt_subtitles_relative_path)
            newsub = serializer.save(uploaded_data=self.request.data.get('datafile'),
                                     vtt_path=vtt_path, webvtt_subtitle_url=vtt_remote_path, srt_path=srt_path
                                     )

            convert_subtitles_to_webvtt(str(newsub.uploaded_data), vtt_path)
