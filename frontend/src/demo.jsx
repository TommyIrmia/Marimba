
onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return

    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) return

    const { tracks, currSongIdx, player, playingStationId } = this.props
    const { stationId } = this.props.match.params

    const newTracks = tracks.slice()
    const [track] = newTracks.splice(source.index, 1)
    newTracks.splice(destination.index, 0, track)

    this.props.onUpdateTracks(newTracks, stationId)

    if (playingStationId !== stationId) return

    const { video_id } = player.getVideoData()
    if (video_id === newTracks[destination.index].id) this.props.setSongIdx(destination.index)

    let newCurrSongIdx = currSongIdx;
    if ((destination.index < currSongIdx && source.index > currSongIdx) ||
        (destination.index > currSongIdx && source.index < currSongIdx)) {
        const diff = source.index > destination.index ? 1 : -1
        newCurrSongIdx += diff
    }
    if (destination.index === currSongIdx && source.index < currSongIdx) newCurrSongIdx -= 1
    if (destination.index === currSongIdx && source.index > currSongIdx) newCurrSongIdx += 1

    newCurrSongIdx !== currSongIdx && this.props.setSongIdx(newCurrSongIdx)
    this.props.loadTracksToPlayer(newTracks, stationId)
}