module.exports = {
  filterReal: function(list, objMap) {
    return list.filter(function(name) {
      return objMap[name];
    }).map(function(name) {
      return objMap[name];
    })
  },
  docRepos: function(selected) {
    return selected.map(function(name) {
      let entry = repoMap[name];
      return `- [${entry.label}](${entry.repo})`;
    }).join('\n')
  }
}
