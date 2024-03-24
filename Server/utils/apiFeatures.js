class apiFeatures {
  constructor(query, queryString) {
    this.queryString = queryString;
    this.query = query;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          title: { $regex: this.queryString.keyword, $options: "i" },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((field) => delete queryObj[field]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const parsedQuery = JSON.parse(queryStr);
    console.log(" queryStr:", parsedQuery);
    this.query.find(parsedQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate(resultPerPage) {
    const page = Number(this.queryString.page) || 1;
    const skip = (page - 1) * resultPerPage;
    this.query = this.query.skip(skip).limit(resultPerPage);
    return this;
  }
}

export default apiFeatures;
