function createArray(...lengthList){
    if(lengthList.length === 0) return [];
    return Array.from(Array(lengthList.shift()),() => createArray(...lengthList))
}

console.log(createArray(2,3,4))
