module.exports = {
	validateAPIKey: (key) => {
          
        //base case
        if(key == null || key.length < 1){
            return false;
        }

        //check for correct key
        if(key == 'cs4783ftw!'){
            return true;
        }

        return false;
        }
};

