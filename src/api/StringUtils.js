export default class StringUtils {
  static states = ["accepted", "starting", "breeding", "leveling", "finishing"];

  static humanize(string) {
    let words = string.split("-");
    for (let i in words) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }

  static stateToString(state) {
    return this.states[state];
  }
}
