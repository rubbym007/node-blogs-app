class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
        const excludeFields = ['sort','page','limit','fields'];

        const queryObje = {...this.queryStr}; // creating a shallow copy
        excludeFields.forEach((el)=> {
            delete queryObje[el];
        })

        let queryString = JSON.stringify(queryObje);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match)=> `$${match}`); // exact match \b and replace g all the occurings
        const queryObj = JSON.parse(queryString);

        this.query = this.query.find(queryObj);
        return this;
    }

    sort(){
        // sorting logic
        if(this.queryStr.sort){
            // sort=price,ratings to sort=price ratings
            const sortBy = this.queryStr.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields(){
        // Limiting fields
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        }else{
            this.query = this.query.select('-__v')
        }
        return this;
    }

    paginate(){
        // pagination
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 10;
        const skip = (page-1)*limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = ApiFeatures;