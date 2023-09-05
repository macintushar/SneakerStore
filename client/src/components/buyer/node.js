fetch('http://65.1.76.191:5001/shoe/' + "nke-air-jordan-1-mid-red")
        .then(response => response.json())
        .then(data => console.log(data))