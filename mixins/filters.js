export const filters = {
  filters: {
    formatDate: function(value) {
      const date = new Date(value);
      return date != "Invalid Date"
        ? `${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`
        : "--.--.----";
    }
  }
};
