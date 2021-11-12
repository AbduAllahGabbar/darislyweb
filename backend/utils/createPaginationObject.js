module.exports = (page, limit, count, data) => {
  const totalNumberOfPages = Math.ceil(count / limit);

  return {
    currentPage: page,
    lastPage: totalNumberOfPages,
    limit: limit,
    total: count,
    data,
  };
};
