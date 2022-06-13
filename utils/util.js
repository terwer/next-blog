export const formatDate = (dt) => {
    if (!dt) {
      return "";
    }
    let newdt = dt.replace(/T/g, ' ')
    return newdt.substr(0, newdt.lastIndexOf('.'));
  }