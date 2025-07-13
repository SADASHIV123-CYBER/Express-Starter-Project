module.exports = {
    
}

function x() {
    console.log("first log");

    setTimeout(() => {
        console.log("second log")
    })

    console.log("third log")
}
x();