exports.paginate = (query) => {
  let page = query.page ? parseInt(query.page) - 1 : 0;
  page = page < 0 ? 0 : page;
  let limit = parseInt(query.limit || 10);
  limit = limit < 0 ? 10 : limit;
  const offset = parseInt(page) * parseInt(limit);

  return {
    offset,
    limit,
  };
};
