

module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {url: 'mongodb://localhost/nodeauth'};

        case 'production':
            return {url: 'mongodb://localhost/nodeauth'};

        case 'testing':
            return {url: 'mongodb://localhost/nodeauthtest'};

        default:
            return {url: 'mongodb://localhost/nodeauth'};
    }
}
