export function createYoutubePlayer(id: string, options?: YT.PlayerOptions) {
    return new YT.Player(id, options);
}