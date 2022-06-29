class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){

        //Why are we handling it separately?
        //Because we want to search pattern and not just the exact string

        const keyword = this.queryStr.keyword ? {
            name : {
                $regex :this.queryStr.keyword,
                $options: "i"
            }
        }:{}
        this.query = this.query.find({...keyword});
        // console.log(this.query);
        return this;
    }
    filter(){
       const newQuery = {...this.queryStr};

       //Removing fieldsp
       const removeFields = ["keyword", "page", "limit"];
       removeFields.forEach((key)=>delete newQuery[key])
       let qury = JSON.stringify(newQuery);
       qury = qury.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);

       //Attaching price filter
       //In mongodb, we do the operations on number via $ operators (example: $gt stands for greater than)
       //However that's not present in query. So we change it.
       
       this.query = this.query.find(JSON.parse(qury));
       return this;
    }

}

module.exports = ApiFeatures;
