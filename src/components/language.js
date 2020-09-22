export function language(name, en_output) {
    if(_language[name] != undefined){
        return _language[name]
    }else if(en_output != undefined && en_output != ''){
        return en_output
    }else{
        return name
    }
}