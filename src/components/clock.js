export function clock(timestamp) {
    let d = new Date(timestamp * 1000);
    let year = d.getFullYear()
    let month = (Array(2).join(0) + (d.getMonth()+1)).slice(-2)
    let day = (Array(2).join(0) + d.getDate()).slice(-2)
    let hour = (Array(2).join(0) + d.getHours()).slice(-2)
    let minute = (Array(2).join(0) + d.getMinutes()).slice(-2)
    let second = (Array(2).join(0) + d.getSeconds()).slice(-2)

    return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
}