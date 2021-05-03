var L = []

L.push(1);
L.push(2);

L.push(3);

console.log(L);

for(let i =0;i<L.length;i++){
    console.log(i,L[i]);
    if(i==1){ L.splice(i,1); i--; continue; }
}
