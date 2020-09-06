export default class StringUtils {
  static states = ["accepted", "starting", "breeding", "leveling", "finishing"];

  static humanize(string) {
    if (string === null || string === undefined) return;
    let words = string.split("-");
    for (let i in words) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }

  static stateToString(state) {
    return this.states[state];
  }

  static formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}
