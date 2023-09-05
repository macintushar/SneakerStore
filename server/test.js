function callAPI() {
    var a = "Hello";
    console.log(a);
}

for(i=0; i<1000; i++) {
    callAPI();
    console.log(i)
}