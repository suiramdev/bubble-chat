const parseEmojis = (message: string, emotes?: {[p: string]: string[]}): string => {
  if (!emotes) return message;

  Object.keys(emotes).forEach((emoteID) => {
    const placement = emotes[emoteID][0].split('-');
    const emoteName = message.substring(parseInt(placement[0]), parseInt(placement[1])+1);

    message = message.replaceAll(
      emoteName,
      `<img class="emoticon" src="https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/3.0" alt='${emoteName}'>`
    );
  });

  return message;
}

export default parseEmojis;