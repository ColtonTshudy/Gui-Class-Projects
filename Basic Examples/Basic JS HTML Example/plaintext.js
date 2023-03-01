// Example of converting decimal to UTF-16 code points.
function ExploringPlainText() {
    const decimalCharCodeUTF16 = 450
    // Javascript String.fromCharCode uses UTF-16
    return String.fromCharCode(decimalCharCodeUTF16)
}

// We call this method on load event
function setParagraph() {
    let out = ExploringPlainText();
    console.log(out)
    let p = document.getElementById('unique')
    console.log(p)
    console.log("Test")
    p.textContent = out
}


