import api from "./api"

const fetchSeriesBySeason = async (movieId, seasonId) => {
    try {
        const resonse = await api.get(`/movie/${movieId}/series`, {
            params: { seasonId }
        });

        const series = resonse.data?.result?.series || [];

        if (series.length === 0) {
            return [{ seriesId: 1, videoLink: "", seasonId }];
        }

        return series.sort((a, b) => a.seriesId - b.seriesId)
    } catch (error) {
        console.error("Ошибка при получении серий:", error);
        return [{ seriesId: 1, videoLink: "", seasonId }];
    }
}

export default fetchSeriesBySeason;