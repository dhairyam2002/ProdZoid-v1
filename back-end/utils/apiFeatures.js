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
    
}

module.exports = ApiFeatures;