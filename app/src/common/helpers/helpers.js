export class Helpers {
    static parseCsvToJson(data) {
        let csvArray = data.split('\n');
        let dataJson = { data: [] };
        const keys = csvArray[0].split(',');

        for(let row = 1; row < csvArray.length; ++row){
            if (csvArray[row]) {
                let data = {};
                const values = csvArray[row].split(',');
        
                for(let keyIndex = 0; keyIndex < keys.length; keyIndex++){
                    data[keys[keyIndex]] = values[keyIndex];
                }
        
                dataJson.data.push(data);
            }
        }
        return dataJson;
    }
}